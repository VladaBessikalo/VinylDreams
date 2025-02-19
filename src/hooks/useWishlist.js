import { useEffect, useState } from 'react';
import { useAuth } from '../auth/context/AuthContext.jsx';
import { db } from '../auth/firebaseConfig.jsx';
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    getDoc
} from 'firebase/firestore';

export default function useWishlist(wishlistId) {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState([]);
    const [isPublic, setIsPublic] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        const fetchWishlist = async () => {
            setLoading(true);
            setError(null);

            try {
                const wishlistRef = doc(db, 'wishlists', user.uid);
                const docSnap = await getDoc(wishlistRef);

                if (docSnap.exists()) {
                    setIsPublic(docSnap.data().isPublic || false);
                }

                const querySnapshot = await getDocs(
                    collection(db, 'wishlists', user.uid, 'albums')
                );
                const albums = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setWishlist(albums);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
                setError('Failed to fetch wishlist. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [user, wishlistId]);

    const deleteItem = async (id) => {
        try {
            await deleteDoc(
                doc(db, 'wishlists', user.uid, 'albums', id.toString())
            );
            setWishlist((prevWishlist) =>
                prevWishlist.filter((item) => item.id !== id)
            );
        } catch (error) {
            console.error('Error deleting item:', error);
            setError('Failed to delete item.');
        }
    };

    const togglePublicStatus = async (event) => {
        const newStatus = event.target.checked;
        const wishlistRef = doc(db, 'wishlists', user.uid);

        try {
            await updateDoc(wishlistRef, { isPublic: newStatus });
            setIsPublic(newStatus);
        } catch (error) {
            console.error('Error updating wishlist visibility:', error);
            setError('Failed to update wishlist visibility.');
        }
    };

    return {
        wishlist,
        isPublic,
        deleteItem,
        togglePublicStatus,
        loading,
        error
    };
}

import { useEffect, useState } from 'react';
import { useAuth } from '../auth/context/AuthContext.jsx';
import Header from '../components/Header.jsx';
import VinylItem from '../components/VinylItem.jsx';
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    getDoc
} from 'firebase/firestore';
import { db } from '../auth/firebaseConfig.jsx';
import { useParams } from 'react-router-dom';

export default function VinylDreamsList() {
    const { user } = useAuth();
    const { wishlistId } = useParams();
    const [wishlist, setWishlist] = useState([]);
    const [isPublic, setIsPublic] = useState(false);

    useEffect(() => {
        const fetchWishlist = async () => {
            const wishlistRef = doc(db, 'wishlists', user.uid);
            const docSnap = await getDoc(wishlistRef);

            if (docSnap.exists()) {
                setIsPublic(docSnap.data().isPublic || false); // Set the public status
            }

            const querySnapshot = await getDocs(
                collection(db, 'wishlists', user.uid, 'albums')
            );
            const albums = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            console.log('albums from database', albums);
            setWishlist(albums);
        };

        fetchWishlist();
        console.log('fetchWishlist', fetchWishlist());
    }, [user, wishlistId]);

    const deleteItem = async (id) => {
        try {
            await deleteDoc(
                doc(db, 'wishlists', user.uid, 'albums', id.toString())
            );

            setWishlist((prevWishlist) =>
                prevWishlist.filter((item) => item.id !== id)
            );

            console.log('Item deleted successfully!');
        } catch (error) {
            console.error('Error deleting item: ', error);
        }
    };

    console.log('wishlist', wishlist);

    // const togglePublicStatus = async (event) => {
    //     const newStatus = event.target.checked;
    //     const wishlistRef = doc(db, 'wishlists', user.uid);

    //     console.log('wishlistRef', wishlistRef);

    //     try {
    //         const docSnap = await getDoc(wishlistRef);

    //         if (docSnap.exists()) {
    //             // Document exists, update the isPublic status
    //             await updateDoc(wishlistRef, {
    //                 isPublic: newStatus
    //             });
    //         } else {
    //             // Document doesn't exist, create it with the isPublic field
    //             await setDoc(wishlistRef, {
    //                 isPublic: newStatus
    //             });
    //         }

    //         setIsPublic(newStatus);
    //     } catch (error) {
    //         console.error('Error updating wishlist visibility: ', error);
    //     }
    // };

    const togglePublicStatus = async (event) => {
        const newStatus = event.target.checked;
        const wishlistRef = doc(db, 'wishlists', user.uid);

        try {
            await updateDoc(wishlistRef, { isPublic: newStatus });
            setIsPublic(newStatus);
        } catch (error) {
            console.error('Error updating wishlist visibility:', error);
        }
    };

    console.log('db', db);

    return (
        <>
            <Header to="/" />
            <div>Fav Vinyls</div>
            <div className="vinyl-dreams-list">VinylDreamsList</div>
            {wishlist.length === 0 ? (
                <p>No favorites added yet.</p>
            ) : (
                <ul>
                    {wishlist.map((album, index) => (
                        <div key={`${album.id}-${index}`}>
                            <VinylItem album={album}> </VinylItem>
                            <button onClick={() => deleteItem(album.id)}>
                                Delete
                            </button>
                        </div>
                    ))}
                </ul>
            )}
            <div>
                <label htmlFor="checkbox-public">
                    Make this DreamList public
                </label>
                <input
                    type="checkbox"
                    id="checkbox-public"
                    name="checkbox-public"
                    checked={isPublic}
                    onChange={togglePublicStatus}
                />
            </div>
            <div>
                {isPublic ? (
                    <p>
                        Your wishlist is public! Feel free to share it with
                        others.
                    </p>
                ) : (
                    <p>Your wishlist is private. Only you can view it.</p>
                )}
            </div>
        </>
    );
}

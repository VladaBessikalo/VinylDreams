import { useEffect, useState } from 'react';
import { useAuth } from '../auth/context/AuthContext.jsx';
import Header from '../components/Header.jsx';
import VinylItem from '../components/VinylItem.jsx';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../auth/firebaseConfig.jsx';

export default function VinylDreamsList() {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            const querySnapshot = await getDocs(
                collection(db, 'wishlists', user.uid, 'albums')
            );
            const albums = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setWishlist(albums);
        };

        fetchWishlist();
    }, [user]);

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
                        <li key={`${album.id}-${index}`}>
                            <VinylItem album={album} />
                            <button onClick={() => deleteItem(album.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

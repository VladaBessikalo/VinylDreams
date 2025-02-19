import { useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import VinylItem from '../components/VinylItem.jsx';
import useWishlist from '../hooks/useWishlist.js';
import Loader from '../components/Loader.jsx';
import '../styles/WishList.scss';

export default function WishlistList() {
    const { wishlistId } = useParams();
    const { wishlist, deleteItem, loading, error } = useWishlist(wishlistId);

    return (
        <>
            <Header to="/" />
            <div className="wishlist">
                <h1 className="wishlist__heading">VinylDreamsList</h1>
                {loading && <Loader />}

                {error && <p className="error-message">{error}</p>}

                {!loading && wishlist.length === 0 && !error && (
                    <p>No favorites added yet.</p>
                )}

                {!loading && !error && wishlist.length > 0 && (
                    <ul className="wishlist__list">
                        {wishlist.map((album) => (
                            <div key={album.id} className="wishlist__item">
                                <VinylItem album={album} />
                                <button onClick={() => deleteItem(album.id)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

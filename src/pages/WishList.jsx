import { useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import VinylItem from '../components/VinylItem.jsx';
import useWishlist from '../hooks/useWishlist.js';
import Loader from '../components/Loader.jsx';

export default function WishlistList() {
    const { wishlistId } = useParams();
    const {
        wishlist,
        isPublic,
        deleteItem,
        togglePublicStatus,
        loading,
        error
    } = useWishlist(wishlistId);

    return (
        <>
            <Header to="/" />
            <div>Fav Vinyls</div>
            <div className="wishlist">VinylDreamsList</div>

            {loading && <Loader />}

            {error && <p className="error-message">{error}</p>}

            {!loading && wishlist.length === 0 && !error && (
                <p>No favorites added yet.</p>
            )}

            {!loading && !error && wishlist.length > 0 && (
                <ul>
                    {wishlist.map((album) => (
                        <div key={album.id}>
                            <VinylItem album={album} />
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

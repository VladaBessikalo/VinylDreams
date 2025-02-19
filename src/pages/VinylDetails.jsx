import { useParams, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { VinylContext } from '../context/VinylContext.jsx';
import Header from '../components/Header.jsx';
import useAlbumDetails from '../hooks/useAlbumDetails.js';
import { db } from '../auth/firebaseConfig.jsx';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../auth/context/AuthContext.jsx';
import { nanoid } from 'nanoid';
import Loader from '../components/Loader.jsx';
import '../styles/VinylDetails.scss';

const VinylDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const { vinyls } = useContext(VinylContext);

    const { album, loading, error } = useAlbumDetails(id);
    console.log('album', album);

    const vinyl =
        location.state?.album || vinyls.find((v) => v.id.toString() === id);
    console.log(vinyl);

    const imageUrl =
        album?.images?.[0]?.uri || album?.images?.[0]?.resource_url;
    const label = album?.labels?.[0]?.name;

    const { user } = useAuth();

    const addToWishlist = async (album) => {
        if (!user) return alert('Please log in first!');
        const wishlistRef = doc(db, 'wishlists', user.uid);
        const wishlistSnap = await getDoc(wishlistRef);

        let wishlistId;
        if (wishlistSnap.exists()) {
            wishlistId = wishlistSnap.data().wishlistId;
        } else {
            wishlistId = nanoid(10);
            await setDoc(wishlistRef, { wishlistId, isPublic: false });
        }

        const albumId = album.id.toString();
        const albumRef = doc(db, 'wishlists', user.uid, 'albums', albumId);
        await setDoc(albumRef, album);

        console.log(`Album added to wishlist (${wishlistId})`);
    };

    return (
        <>
            <Header />
            {loading ? (
                <Loader />
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div className="album-details__wrapper">
                    <div className="album-details">
                        <h1>
                            {album.artists_sort} - {album.title}
                            <button
                                onClick={() => {
                                    addToWishlist(album);
                                }}
                            >
                                🤍
                            </button>
                        </h1>
                        <img
                            src={imageUrl || vinyl.cover_image}
                            alt={album.title}
                        />
                        <p>Genre: {album.genres}</p>
                        <p>Country: {album.country}</p>
                        <p>Released: {album.released_formatted}</p>
                        <p>Label: {label}</p>
                        <div className="tracklist">
                            <h2>Tracklist</h2>

                            {album && album.tracklist?.length > 0 ? (
                                <ul>
                                    {album.tracklist.map((track, index) => (
                                        <li key={index}>
                                            {track.position} - {track.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No tracklist available.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VinylDetails;

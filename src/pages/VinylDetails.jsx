import { useParams, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { VinylContext } from '../context/VinylContext.jsx';
import Header from '../components/Header.jsx';
import useAlbumDetails from '../hooks/useAlbumDetails.js';
import { db } from '../auth/firebaseConfig.jsx';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../auth/context/AuthContext.jsx';
import { nanoid } from 'nanoid';
import Loader from '../components/Loader.jsx';
import '../styles/VinylDetails.scss';
import { AppButton } from '../components/AppButton.jsx';

const VinylDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const { vinyls } = useContext(VinylContext);

    const { album, loading, error } = useAlbumDetails(id);

    const [isWishlisted, setIsWishlisted] = useState(false);

    console.log('album', album);

    const vinyl =
        location.state?.album || vinyls.find((v) => v.id.toString() === id);
    console.log(vinyl);

    const imageUrl =
        album?.images?.[0]?.uri || album?.images?.[0]?.resource_url;

    const label = album?.labels?.[0]?.name;

    const { user } = useAuth();

    useEffect(() => {
        const checkWishlist = async () => {
            if (!user || !album?.id) return;
            const albumRef = doc(
                db,
                'wishlists',
                user.uid,
                'albums',
                album.id.toString()
            );
            const docSnap = await getDoc(albumRef);
            if (docSnap.exists()) {
                setIsWishlisted(true);
            }
        };
        checkWishlist();
    }, [user, album]);

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

        setIsWishlisted(true);
        console.log(`Album added to wishlist (${wishlistId})`);
    };

    const removeFromWishlist = async (album) => {
        if (!user) return alert('Please log in first!');
        const albumId = album.id.toString();
        const albumRef = doc(db, 'wishlists', user.uid, 'albums', albumId);

        try {
            await deleteDoc(albumRef);
            setIsWishlisted(false);
            console.log('Album removed from wishlist');
        } catch (error) {
            console.error('Error removing album from wishlist: ', error);
        }
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
                            <AppButton
                                onClick={() => {
                                    if (isWishlisted) {
                                        removeFromWishlist(album);
                                    } else {
                                        addToWishlist(album);
                                    }
                                }}
                            >
                                {isWishlisted ? '🖤' : '🤍'}
                            </AppButton>
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

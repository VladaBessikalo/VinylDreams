import { useParams, useLocation, Link } from 'react-router-dom';
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
import { Box, Typography, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AlertDialog from '../components/AlertDialog.jsx';
import { AppButton } from '../components/AppButton.jsx';


const VinylDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const { vinyls } = useContext(VinylContext);

    const { album, loading, error } = useAlbumDetails(id);

    const [isWishlisted, setIsWishlisted] = useState(false);

    const vinyl =
        location.state?.album || vinyls.find((v) => v.id.toString() === id);

    const imageUrl =
        album?.images?.[0]?.uri || album?.images?.[0]?.resource_url;

    const label = album?.labels?.[0]?.name;

    const { user } = useAuth();
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => setDialogOpen(false);


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
        if (!user) return handleDialogOpen();
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
        if (!user) return handleDialogOpen();
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
            <AlertDialog 
                open={dialogOpen}
                onClose={handleDialogClose}
                title={"Login Required"}
                description="You must be logged in to modify your wishlist. Please log in or create an account to continue."
                actions={
                <>
                    <AppButton onClick={handleDialogClose}>Cancel</AppButton>
                    <Link to="/login">
                        <AppButton>Go to Login</AppButton>
                    </Link>
                </>}
            />
            {loading ? (
                <Loader />
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div className="album-details__wrapper">
                    <Box className="album-details">
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                width: '100%',
                                padding: '15px 0',
                                gap: '30px',
                            }}
                        >
                            <Typography variant="h5" sx={{ fontStyle: 'bold' }}>
                                {album.artists_sort} - {album.title}
                            </Typography>
                            <Button sx={{fontSize: '20px'}}
                                onClick={() => {
                                    if (isWishlisted) {
                                        removeFromWishlist(album);
                                    } else {
                                        addToWishlist(album);
                                    }
                                }}
                            >
                                {isWishlisted ? <FavoriteIcon color='secondary'/> : <FavoriteBorderIcon color='secondary'/>}
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 4,
                                width: '100%'
                            }}
                            className="album-details__content"
                        >
                            <Box
                                sx={{
                                    flexShrink: 0,
                                    width: '300px'
                                }}
                            >
                                <img
                                    src={imageUrl || vinyl.cover_image}
                                    alt={album.title}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                                <Box sx={{ marginTop: '20px' }}>
                                    <p>Genre: {album.genres}</p>
                                    <p>Country: {album.country}</p>
                                    <p>Released: {album.released_formatted}</p>
                                    <p>Label: {label}</p>
                                </Box>
                            </Box>
                            <Box className="tracklist">
                                <Typography
                                    variant="h6"
                                    sx={{ paddingBottom: '10px' }}
                                >
                                    Tracklist:{' '}
                                </Typography>

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
                            </Box>
                        </Box>
                    </Box>
                </div>
            )}
        </>
    );
};

export default VinylDetails;

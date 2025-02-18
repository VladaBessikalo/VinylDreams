import { useParams, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { VinylContext } from '../context/VinylContext.jsx';
import Header from '../components/Header.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import heartRegular from '../assets/heart-regular.svg';
import heartSolid from '../assets/heart-solid.svg';
import useAlbumDetails from '../hooks/useAlbumDetails.js';

const VinylDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const { vinyls } = useContext(VinylContext);
    const { favorites, toggleFavorite } = useFavorites();
    console.log(id);

    const { album, loading, error } = useAlbumDetails(id);
    console.log('album', album);

    const vinyl =
        location.state?.album || vinyls.find((v) => v.id.toString() === id);
    console.log(vinyl);

    const isFavorite = favorites.some((fav) => fav.id === vinyl.id);
    const imageUrl =
        album?.images?.[0]?.uri || album?.images?.[0]?.resource_url;
    const label = album?.labels?.[0]?.name;
    return (
        <>
            <Header />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div>
                <h1>
                    {album.artists_sort} - {album.title}
                </h1>

                <img src={imageUrl} alt={album.title} />
                <p>Genre: {album.genres}</p>
                <p>Country: {album.country}</p>
                <p>Released: {album.released_formatted}</p>
                <p>Label: {label}</p>
            </div>
            <div onClick={() => toggleFavorite(vinyl)}>
                <img
                    src={isFavorite ? heartSolid : heartRegular}
                    alt="heart"
                    className="heart"
                />
            </div>
            <div>
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
        </>
    );
};

export default VinylDetails;

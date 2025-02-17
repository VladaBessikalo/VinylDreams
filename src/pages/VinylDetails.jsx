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

    const vinyl =
        location.state?.album || vinyls.find((v) => v.id.toString() === id);

    const { tracklist, loading, error } = useAlbumDetails(id);

    console.log(tracklist);

    if (!vinyl) {
        return <div>No details found for this vinyl.</div>;
    }

    const isFavorite = favorites.some((fav) => fav.id === vinyl.id);

    return (
        <>
            <Header />
            <div>
                <h1>{vinyl.title}</h1>
                <img src={vinyl.cover_image} alt={vinyl.title} />
                <p>Year: {vinyl.year}</p>
                <p>Genre: {vinyl.genre}</p>
                <p>Country: {vinyl.country}</p>
                <p>Label: {vinyl.label}</p>
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
                {loading && <p>Loading tracklist...</p>}
                {error && <p>Error: {error}</p>}
                <ul>
                    {tracklist.map((track, index) => (
                        <li key={index}>
                            {track.position} - {track.title}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default VinylDetails;

import { useParams, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { VinylContext } from '../context/VinylContext.jsx';
import Header from '../components/Header.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import heartRegular from '../assets/heart-regular.svg';
import heartSolid from '../assets/heart-solid.svg';

const VinylDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const { vinyls } = useContext(VinylContext);
    const { favorites, toggleFavorite } = useFavorites();

    const vinyl =
        location.state?.album || vinyls.find((v) => v.id.toString() === id);

    if (!vinyl) {
        return <div>No details found for this vinyl.</div>;
    }

    const isFavorite = favorites.includes(vinyl);

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
        </>
    );
};

export default VinylDetails;

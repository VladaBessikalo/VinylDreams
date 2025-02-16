import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import heartRegular from '../assets/heart-regular.svg';
import heartSolid from '../assets/heart-solid.svg';
import './VinylItem.scss';

export default function VinylItem({ album }) {
    // const { favorites, toggleFavorite } = useFavorites();
    // const isFavorite = favorites.includes(album);
    const { favorites = [], toggleFavorite } = useFavorites();
    const isFavorite = favorites.some((fav) => fav.id === album.id);

    return (
        <li className="vinyl-list__album-card">
            <img
                src={album.cover_image}
                alt={album.title}
                className="vinyl-list__album-image"
            />
            <p className="vinyl-list__album-title">{album.title}</p>
            <p className="vinyl-list__album-year">{album.year}</p>
            <p className="vinyl-list__album-genre">{album.genre}</p>
            <Link to={`/vinyl/${album.id}`} state={{ album }}>
                <button>View Details</button>
            </Link>
            <div onClick={() => toggleFavorite(album)}>
                <img
                    src={isFavorite ? heartSolid : heartRegular}
                    alt="heart"
                    className="heart"
                />
            </div>
        </li>
    );
}

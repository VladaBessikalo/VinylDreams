import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import heartRegular from '../assets/heart-regular.svg';
import heartSolid from '../assets/heart-solid.svg';
import './VinylItem.scss';
import defaultImg from '../assets/vinyl.png';

export default function VinylItem({ album }) {
    const { favorites = [], toggleFavorite } = useFavorites();
    const isFavorite = favorites.some((fav) => fav.id === album.id);

    if (album.cover_image.endsWith('.gif')) {
        album.cover_image = defaultImg;
    }

    return (
        <li className="vinyl-list__album-card">
            <img
                src={album.cover_image}
                alt={album.title}
                className="vinyl-list__album-image"
            />
            <div className="vinyl-list__album-info">
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
            </div>
        </li>
    );
}

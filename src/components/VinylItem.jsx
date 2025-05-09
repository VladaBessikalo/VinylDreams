import { Link } from 'react-router-dom';
import '../styles/VinylItem.scss';
import defaultImg from '../assets/vinyl.png';
import { AppButton } from './AppButton';

export default function VinylItem({ album }) {
    const coverImage = album.cover_image?.endsWith('.gif')
        ? defaultImg
        : album.cover_image || album.images?.[0]?.resource_url;

    return (
        <li className="vinyl-list__album-card">
            <img
                src={coverImage}
                alt={album.title}
                className="vinyl-list__album-image"
            />
            <div className="vinyl-list__album-info">
                <p className="vinyl-list__album-title">{album.title}</p>
                <p className="vinyl-list__album-year">{album.year}</p>
                <p className="vinyl-list__album-genre">
                    {album.genre || album.genres}
                </p>
                <Link to={`/vinyl/${album.id}`} state={{ album }}>
                    <AppButton>View Details</AppButton>
                </Link>
            </div>
        </li>
    );
}

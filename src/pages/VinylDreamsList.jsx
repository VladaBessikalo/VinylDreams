import Header from '../components/Header';
import { useFavorites } from '../context/FavoritesContext';
import VinylItem from '../components/VinylItem';

export default function VinylDreamsList() {
    const { favorites } = useFavorites();

    return (
        <>
            <Header to="/" />
            <div className="vinyl-dreams-list">VinylDreamsList</div>
            {favorites.length === 0 ? (
                <p>No favorites added yet.</p>
            ) : (
                <ul>
                    {favorites.map((fav, index) => (
                        <VinylItem key={`${fav.id}-${index}`} album={fav} />
                    ))}
                </ul>
            )}
        </>
    );
}

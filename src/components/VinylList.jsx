import { useState, useEffect } from 'react';
import { fetchVinylRecords } from '../hooks/useFetchVinyls';

export default function VinylList({ searchQuery }) {
    const [albums, setAlbums] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getAlbums = async () => {
            const results = await fetchVinylRecords(searchQuery, page);
            setAlbums(results);
            console.log(results);
        };

        getAlbums();
        console.log(getAlbums());
    }, [searchQuery, page]);

    return (
        <div>
            <h2>Vinyl-4-Wish</h2>
            <div className="grid">
                {albums
                    .filter(
                        (album) =>
                            album.format?.includes('Vinyl') ||
                            album.format?.includes('LP')
                    )
                    .map((album) => (
                        <div key={album.id} className="album-card">
                            <img src={album.cover_image} alt={album.title} />
                            <p>{album.title}</p>
                            <p>{album.year}</p>
                            <p>{album.genre}</p>
                        </div>
                    ))}
            </div>
            <button onClick={() => setPage(page + 1)}>Next Page</button>
        </div>
    );
}

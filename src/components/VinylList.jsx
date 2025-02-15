import { useState, useEffect, useRef, useContext } from 'react';
import useFetch from '../hooks/useFetch.js';
import './VinylList.scss';
import { Link } from 'react-router-dom';
import { VinylContext } from '../context/VinylContext.jsx';

const token = 'bLxswIOxdBPIZYXUKgLDAHgSZLfKGREdKAObuImT';
const itemsPerPage = 100;

export default function VinylList({ searchQuery }) {
    const [page, setPage] = useState(1);
    const [resetData, setResetData] = useState(false);
    const containerRef = useRef(null);
    const { vinyls, setVinyls } = useContext(VinylContext);

    const query = searchQuery ? `q=${encodeURIComponent(searchQuery)}` : '';
    const url = `https://api.discogs.com/database/search?${query}&format=Vinyl&format=LP&type=release&per_page=${itemsPerPage}&page=${page}&token=${token}`;

    const { data: albums, loading, error } = useFetch(url, resetData);

    // useEffect(() => {
    //     if (searchQuery) {
    //         setResetData(true);
    //     } else {
    //         setResetData(false);
    //     }
    // }, [searchQuery]);

    useEffect(() => {
        setVinyls([]); // Clear stored vinyls
        setPage(1);
        setResetData(true);
    }, [searchQuery, setVinyls]);

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (container) {
                const scrollPosition =
                    container.scrollTop + container.clientHeight;
                const scrollHeight = container.scrollHeight;
                const gapBeforeFetchingNewData = 100;

                const bottom =
                    scrollHeight - scrollPosition <= gapBeforeFetchingNewData;
                console.log('bottom:', bottom);

                if (bottom && !loading) {
                    setPage((prevPage) => prevPage + 1);
                }
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [loading]);

    console.log('albums', albums);

    useEffect(() => {
        if (albums.length > 0) {
            setVinyls((prevVinyls) => [...prevVinyls, ...albums]);
        }
    }, [albums, setVinyls]);

    return (
        <div className="vinyl-list" ref={containerRef}>
            <div className="vinyl-list__container">
                {loading && <p>Loading...</p>}
                {error && <p>Error {error}</p>}
                <ul className="vinyl-list__albums">
                    {vinyls
                        .filter(
                            (album) =>
                                (album.format?.includes('Vinyl') ||
                                    album.format?.includes('LP')) &&
                                !album.cover_image?.endsWith('.gif')
                        )
                        .map((album, index) => (
                            <li
                                key={`${album.id}-${index}`} // Combine album.id with index to create a unique key
                                className="vinyl-list__album-card"
                            >
                                <img
                                    src={album.cover_image}
                                    alt={album.title}
                                    className="vinyl-list__album-image"
                                />
                                <p className="vinyl-list__album-title">
                                    {album.title}
                                </p>
                                <p className="vinyl-list__album-year">
                                    {album.year}
                                </p>
                                <p className="vinyl-list__album-genre">
                                    {album.genre}
                                </p>
                                <Link
                                    to={`/vinyl/${album.id}`}
                                    state={{ album }}
                                >
                                    <button>View Details</button>
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

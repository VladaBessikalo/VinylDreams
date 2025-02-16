import { useState, useEffect, useRef, useContext } from 'react';
import useFetch from '../hooks/useFetch.js';
import './VinylList.scss';
// import { Link } from 'react-router-dom';
import { VinylContext } from '../context/VinylContext.jsx';
import VinylItem from './VinylItem.jsx';

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
            setVinyls((prevVinyls) => {
                const newVinyls = [...prevVinyls, ...albums];

                const uniqueVinyls = newVinyls.filter(
                    (v, index, self) =>
                        index === self.findIndex((t) => t.id === v.id)
                );

                return uniqueVinyls;
            });
        }
    }, [albums, setVinyls]);

    return (
        <div className="vinyl-list" ref={containerRef}>
            <div className="vinyl-list__container">
                {loading && <p>Loading...</p>}
                {error && <p>Error {error}</p>}
                <ul className="vinyl-list__albums">
                    {vinyls.map((album, index) => (
                        <VinylItem
                            key={`${album.id}-${index}`}
                            album={album}
                        ></VinylItem>
                    ))}
                </ul>
            </div>
        </div>
    );
}

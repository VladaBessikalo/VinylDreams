import { useState, useEffect } from 'react';

export default function useFetch(url, resetData = false) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            if (resetData) {
                setData([]);
            }

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                const filteredResults = result.results.filter(
                    (album) =>
                        (album.format?.includes('Vinyl') ||
                            album.format?.includes('LP')) &&
                        album.title &&
                        !album.cover_image?.endsWith('.gif')
                );

                setData(filteredResults);
                console.log('result', filteredResults);
            } catch (err) {
                setError(err.message);
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, resetData]);

    return { data, loading, error };
}

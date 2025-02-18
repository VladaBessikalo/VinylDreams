import { useState, useEffect } from 'react';

// const API_TOKEN = import.meta.env.VITE_DISCOGS_TOKEN;

const useAlbumDetails = (albumId) => {
    const [album, setAlbum] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!albumId) {
            setError('No album ID provided');
            return;
        }
        const fetchAlbumDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.discogs.com/releases/${albumId}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log('Fetched album data:', data);
                setAlbum(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching album:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbumDetails();
    }, [albumId]);

    return { album, loading, error };
};

export default useAlbumDetails;

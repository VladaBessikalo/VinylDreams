export const fetchVinylRecords = async (query, page = 1) => {
    const token = 'bLxswIOxdBPIZYXUKgLDAHgSZLfKGREdKAObuImT';

    const url = `https://api.discogs.com/database/search?q=${encodeURIComponent(
        query
    )}&type=release&per_page=20&page=${page}&token=${token}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching vinyl records:', error);
        return [];
    }
};

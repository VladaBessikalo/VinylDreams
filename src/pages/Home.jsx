import VinylList from '../components/VinylList';
import { useState } from 'react';
import SearchBar from '../components/SearchBar.jsx';

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div>
            <h1>Vinyl Dreams</h1>
            <SearchBar onSearch={setSearchQuery} />
            <VinylList searchQuery={searchQuery} />
        </div>
    );
}

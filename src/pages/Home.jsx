import VinylList from '../components/VinylList';
import { useState } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import './Home.scss';
import Header from '../components/Header.jsx';

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="main-page">
            <Header />
            <SearchBar onSearch={setSearchQuery} />
            <VinylList searchQuery={searchQuery} />
        </div>
    );
}

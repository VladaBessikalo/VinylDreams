import { useState } from 'react';
import '../styles/SearchBar.scss';
import { AppButton } from './AppButton';
export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            onSearch(query);
        }
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit} className="search-bar__form">
                <input
                    type="text"
                    placeholder="Search vinyl records..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <AppButton type="submit">Search</AppButton>
            </form>
        </div>
    );
}

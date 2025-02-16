import { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    // const toggleFavorite = (album) => {
    //     setFavorites((prevFavorites) => {
    //         prevFavorites.includes(album)
    //             ? prevFavorites.filter((i) => i !== album)
    //             : [...prevFavorites, album];
    //     });
    // };

    const toggleFavorite = (album) => {
        setFavorites((prevFavorites) => {
            const exists = prevFavorites.some((fav) => fav.id === album.id);
            return exists
                ? prevFavorites.filter((fav) => fav.id !== album.id) // Remove
                : [...prevFavorites, album]; // Add
        });
    };

    console.log(favorites);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}

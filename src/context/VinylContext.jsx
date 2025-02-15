import { createContext, useState } from 'react';

export const VinylContext = createContext();

export const VinylProvider = ({ children }) => {
    const [vinyls, setVinyls] = useState([]);

    return (
        <VinylContext.Provider value={{ vinyls, setVinyls }}>
            {children}
        </VinylContext.Provider>
    );
};

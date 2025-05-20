import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearch = () => {
    return useContext(SearchContext);
}

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SearchContext.Provider value = {{ searchQuery, setSearchQuery}}>
            {children}
        </SearchContext.Provider>
    )
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
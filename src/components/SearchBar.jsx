import { useEffect, useState } from 'react';
import '../styles/SearchBar.scss';
// import { AppButton } from './AppButton';
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useSearch } from '../context/SearchContext';
import { useLocation, useNavigate } from 'react-router-dom';
import {SearchContainer, StyledInputBase, Wrapper} from "../styles/SearchBar.styles"
import { IconButton, InputAdornment } from '@mui/material';

// export default function SearchBar({ onSearch }) {
//     const [query, setQuery] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (query.trim() !== '') {
//             onSearch(query);
//         }
//     };

//     return (
//         <div className="search-bar">
//             <form onSubmit={handleSubmit} className="search-bar__form">
//                 <input
//                     type="text"
//                     placeholder="Search vinyl records..."
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                 />
//                 <AppButton type="submit">Search</AppButton>
//             </form>
//         </div>
//     );
// }


const SearchBar = () => {
    const { searchQuery, setSearchQuery} = useSearch();
    const [query, setQuery] = useState(searchQuery);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setQuery(searchQuery);
    }, [searchQuery]);

    const handleSearch = () => {
        setSearchQuery(query.trim());

        if (location.pathname !== "/") {
            navigate("/");
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleClear = () => {
        setQuery("");
        setSearchQuery("");
    };

    return (
        <Wrapper>
            <SearchContainer>
  <StyledInputBase
          placeholder="Search ..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ marginLeft: "8px" }} />
            </InputAdornment>
          }
          endAdornment={
            query && (
              <InputAdornment position="end">
                <IconButton onClick={handleClear} size="small">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
            </SearchContainer>
        </Wrapper>
    )
}

export default SearchBar;
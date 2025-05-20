import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './auth/context/AuthContext.jsx';
import Home from './pages/Home';

import './App.scss';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import WishList from './pages/WishList.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import VinylDetails from './pages/VinylDetails.jsx';
import { VinylProvider } from './context/VinylContext.jsx';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './context/theme.js';
import { SearchProvider } from './context/SearchContext.jsx';

function App() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <ThemeProvider theme={theme}>
            <VinylProvider>
                <SearchProvider>
                <AuthProvider>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                />
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />

                        <Route
                            path="/wishlist/"
                            element={
                                <ProtectedRoute>
                                    <WishList />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="/vinyl/:id" element={<VinylDetails />} />
                    </Routes>
                </AuthProvider>
                </SearchProvider>
            </VinylProvider>
        </ThemeProvider>
    );
}

export default App;

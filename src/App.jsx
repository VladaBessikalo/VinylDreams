import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './auth/context/AuthContext.jsx';
import Home from './pages/Home';

import './App.scss';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import VinylDreamsList from './pages/VinylDreamsList.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import VinylDetails from './pages/VinylDetails.jsx';
import { VinylProvider } from './context/VinylContext.jsx';

function App() {
    return (
        <VinylProvider>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />

                    <Route
                        path="/vinyldreams"
                        element={
                            <ProtectedRoute>
                                <VinylDreamsList />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/vinyl/:id" element={<VinylDetails />} />
                </Routes>
            </AuthProvider>
        </VinylProvider>
    );
}

export default App;

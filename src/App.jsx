import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './auth/context/AuthContext.jsx';
import Home from './pages/Home';

import './App.scss';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import VinylDreamsList from './pages/VinylDreamsList.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';

function App() {
    return (
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
            </Routes>
        </AuthProvider>
    );
}

export default App;

import { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { auth } from '../firebaseConfig.jsx';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signUp = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signUp, signIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

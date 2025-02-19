import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthContext.jsx';
import './Header.scss';

export default function Header() {
    const { user, logOut } = useAuth();
    const { pathname } = useLocation();

    return (
        <div className="header">
            <header>
                <Link to="/">🤍🤍🤍 Vinyl Dreams 🤍🤍🤍</Link>
            </header>
            <nav className="header-nav">
                {user ? (
                    <>
                        {pathname === '/vinyldreams' ? (
                            <Link to="/">Choose new Vinyl Dreams</Link>
                        ) : (
                            <Link to="/vinyldreams">My Vinyl Dreams 🤍</Link>
                        )}
                        <button onClick={logOut}>Logout</button>
                    </>
                ) : (
                    pathname === '/' && <Link to="/login">Login</Link>
                )}
            </nav>
        </div>
    );
}

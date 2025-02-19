import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthContext.jsx';
import './Header.scss';
import vinylIcon from '../assets/vinyl-icon.png';

export default function Header() {
    const { user, logOut } = useAuth();
    const { pathname } = useLocation();

    return (
        <div className="header">
            <header>
                <Link to="/" className="vinyl-logo">
                    <img
                        src={vinylIcon}
                        alt="Vinyl Icon"
                        className="vinyl-logo__vinyl-icon"
                    />
                    <span className="vinyl-logo__text">Vinyl Dreams </span>
                </Link>
            </header>
            <div className="header__motto"> Vinyl Dreams, Tailored by You!</div>
            <nav className="header_nav">
                {user ? (
                    <>
                        {pathname === '/wishlist' ? (
                            <Link to="/">Choose new Vinyl Dreams</Link>
                        ) : (
                            <Link to="/wishlist">My Vinyl Dreams 🤍</Link>
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

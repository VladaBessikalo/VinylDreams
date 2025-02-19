import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthContext.jsx';
import '../styles/Header.scss';
import vinylIcon from '../assets/vinyl-icon.png';
import { HeaderButton } from './HeaderButton.jsx';

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
            <nav className="header__nav">
                {user ? (
                    <>
                        {pathname === '/wishlist' ? (
                            <Link to="/" className="header__nav-route">
                                Choose new Vinyl Dreams
                            </Link>
                        ) : (
                            <Link to="/wishlist" className="header__nav-route">
                                My Vinyl Dreams 🤍🤍🤍
                            </Link>
                        )}
                        <HeaderButton onClick={logOut}>Log out</HeaderButton>
                    </>
                ) : (
                    pathname === '/' && (
                        <Link to="/login">
                            <HeaderButton>Login</HeaderButton>
                        </Link>
                    )
                )}
            </nav>
        </div>
    );
}

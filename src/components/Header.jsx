import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthContext.jsx';
import './Header.scss';

export default function Header() {
    const { user, logOut } = useAuth();
    const location = useLocation();

    const isVinylListPage = location.pathname === '/vinyldreams';
    const isHomePage = location.pathname === '/';

    console.log(user);
    return (
        <div className="header">
            <header>
                <a href="/"> 🤍🤍🤍 Vinyl Dreams 🤍🤍🤍 </a>
            </header>
            <nav className="header-nav">
                {user ? (
                    isVinylListPage ? (
                        <>
                            <Link to="/">
                                <a>Choose new Vinyl Dreams </a>
                            </Link>
                            <Link to="/">
                                <button onClick={logOut}>Logout</button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/vinyldreams">My Vinyl Dreams 🤍</Link>
                            <Link to="/">
                                <button onClick={logOut}>Logout</button>
                            </Link>
                        </>
                    )
                ) : (
                    isHomePage && (
                        <>
                            <Link to="/login">Login</Link>
                        </>
                    )
                )}
            </nav>
        </div>
    );
}

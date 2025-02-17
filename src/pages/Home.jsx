import VinylList from '../components/VinylList';

import './Home.scss';
import Header from '../components/Header.jsx';

export default function Home() {
    return (
        <div className="main-page">
            <Header />
            <VinylList />
        </div>
    );
}

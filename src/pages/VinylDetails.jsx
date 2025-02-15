import { useParams, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { VinylContext } from '../context/VinylContext.jsx';
import Header from '../components/Header.jsx';

const VinylDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const { vinyls } = useContext(VinylContext);

    const vinyl =
        location.state?.album || vinyls.find((v) => v.id.toString() === id);

    if (!vinyl) {
        return <div>No details found for this vinyl.</div>;
    }

    return (
        <>
            <Header />
            <div>
                <h1>{vinyl.title}</h1>
                <img src={vinyl.cover_image} alt={vinyl.title} />
                <p>Year: {vinyl.year}</p>
                <p>Genre: {vinyl.genre}</p>
                <p>Country: {vinyl.country}</p>
                <p>Label: {vinyl.label}</p>
            </div>
        </>
    );
};

export default VinylDetails;

import { PuffLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import '../styles/Loader.scss';

export default function Loader({ size = 50, color = '#333' }) {
    return (
        <div className="loader-container">
            <PuffLoader size={size} color={color} />
        </div>
    );
}

Loader.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string
};

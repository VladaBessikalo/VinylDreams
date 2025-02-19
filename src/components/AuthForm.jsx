import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import { TextField, Typography, Container, Box } from '@mui/material';
import { AppButton } from './AppButton.jsx';

const AuthForm = ({ onSubmit, heading, linkText, linkPath, errorMessage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await onSubmit(email, password);
            navigate('/wishlist');
        } catch (err) {
            setError(errorMessage || `Error: ${err.message}`);
        }
    };

    return (
        <>
            <Header />
            <Container maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 4
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom>
                        {heading}
                    </Typography>
                    {error && (
                        <Typography color="error" variant="body2" gutterBottom>
                            {error}
                        </Typography>
                    )}
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                        />
                        <AppButton
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            {heading}
                        </AppButton>
                    </form>
                    <Typography variant="body2" sx={{ marginTop: 2 }}>
                        {linkText}{' '}
                        <Link
                            to={linkPath}
                            style={{ textDecoration: 'none' }}
                            className="form__toggle"
                        >
                            {heading === 'Login' ? 'Sign up' : 'Login'}
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </>
    );
};

export default AuthForm;

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#f8f8f8'
        },
        secondary: {
            main: '#a8032a', // red
            dark: '#7a0220'
        },
        background: {
            default: '#f8f8f8'
        },
        text: {
            main: '#ffffff'
        }
    },
    typography: {
        fontFamily: 'Roboto, Arial',
        h1: {
            fontSize: '2.5rem'
        }
    }
});

export default theme;

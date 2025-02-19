import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const HeaderButton = styled(Button)(() => ({
    backgroundColor: 'rgb(18, 18, 18)',
    color: 'rgb(255, 255, 255)',
    padding: '10px 16px',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(18, 18, 18)',
        boxShadow: '0px 4px 10px rgba(219, 45, 33, 0.5)',
        borderRadius: '8px'
    },
    margin: '0 0 0 20px',
    textTransform: 'capitalize'
}));

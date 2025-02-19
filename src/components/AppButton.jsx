import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const AppButton = styled(Button)(() => ({
    backgroundColor: 'rgb(219, 45, 33)',
    color: 'rgb(255, 255, 255)',
    padding: '12px 24px',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: 'rgb(18, 18, 18)',
        color: 'rgb(255, 255, 255)',
        boxShadow: '0px 4px 10px rgba(219, 45, 33, 0.5)'
    }
}));

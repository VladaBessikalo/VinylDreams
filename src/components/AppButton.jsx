import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const AppButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.main,
    padding: '12px 24px',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.text.main
    }
}));

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const AlertDialog = ({ open, onClose, title, description, actions }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {actions ? (
                    actions
                ) : (
                    <Button onClick={onClose} autoFocus>
                        Close
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;

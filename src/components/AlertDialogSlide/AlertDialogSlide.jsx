import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = ({ buttonText, dialogTitle, dialogContent, disagreeText, agreeText, onDisagree, onAgree, renderActivator }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDisagree = (e) => {
        e.preventDefault();
        onDisagree && onDisagree();
        handleClose();
    };

    const handleAgree = (e) => {
        e.preventDefault();
        onAgree && onAgree();
        handleClose();
    };

    return (
        <React.Fragment>
            {renderActivator ?
                renderActivator({
                    onClick: handleClickOpen,
                }) : (
                    <Button variant="outlined" onClick={handleClickOpen}>
                        {buttonText}
                    </Button>
                )
            }
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => handleDisagree(e)}>{disagreeText}</Button>
                    <Button onClick={(e) => handleAgree(e)}>{agreeText}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default AlertDialogSlide;

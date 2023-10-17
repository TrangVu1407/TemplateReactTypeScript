import React from 'react'
import { Box, Stack, Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@mui/material';

interface Props {
    open: boolean;
    closeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfoDialog: React.FC<Props> = ({ open, closeOpen }) => {

    return (
        <Dialog
            open={open}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Use Google's location service?"}</DialogTitle>
            <hr />
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <hr />
            <DialogActions>
                <Button variant="outlined" onClick={() => closeOpen(!open)}>Đóng</Button>
                <Button variant="contained">Thêm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default InfoDialog
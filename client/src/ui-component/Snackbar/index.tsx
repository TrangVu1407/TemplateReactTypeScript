import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type AlertColor = "success" | "error" | "warning" | "info";
export interface messageSnackBar {
    notification: string;
    severity: AlertColor;
}

interface Props {
    openMessage: boolean;
    setOpenMessage: React.Dispatch<React.SetStateAction<boolean>>;
    messsage: messageSnackBar;
}

const SnackBar: React.FC<Props> = ({ openMessage, messsage, setOpenMessage }) => {
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenMessage(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }} open={openMessage} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={messsage.severity} sx={{ width: '100%' }}>
                    {messsage.notification}
                </Alert>
            </Snackbar>
        </Stack>
    );
}

export default SnackBar

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

interface Props {
    openMessage: boolean;
}

const SnackBar: React.FC<Props> = ({ openMessage }) => {
    const [open_v1, setOpen] = React.useState(openMessage);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }} open={open_v1} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    chúc mừng bạn đã thêm loại loại sản phẩm mới thành công!!!
                </Alert>
            </Snackbar>
        </Stack>
    );
}

export default SnackBar

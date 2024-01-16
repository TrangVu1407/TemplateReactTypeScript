import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Typography } from '@mui/material';
import productColorServices from "services/product_color/product_color";
import type { PropsDeleteProductColor } from "services/product_color/product_color";
import { dataUpdate } from "./index";
import { messageSnackBar } from "ui-component/Snackbar/index"
import { useTranslation } from 'react-i18next';

interface Props {
    open: boolean;
    closeOpen: (status: boolean) => Promise<void>;
    item: dataUpdate;
    setMessage: React.Dispatch<React.SetStateAction<messageSnackBar>>
}

const DeleteDialog: React.FC<Props> = ({ open, closeOpen, item, setMessage }) => {
    const { t } = useTranslation();
    const deleteColorProduct = async () => {
        try {
            let body: PropsDeleteProductColor = {
                id: item.id,
            };
            const response = await productColorServices.delete(body);
            const result = response.data;
            if (result && !result.error) {
                setMessage({ notification: `${t('product_color_delete_success')}`, severity: "success" })
                let callApi = true;
                closeOpen(callApi);
            } else {
                setMessage({ notification: `${('connect_error')}`, severity: "error" })
            }
        } catch (e) {
            setMessage({ notification: `${('connect_error')}`, severity: "error" })
        }
    }

    return (
        <Dialog
            open={open}
            fullWidth={true}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>{t('product_color_delete_title')}</DialogTitle>
            <hr />
            <DialogContent className='dialogDelete'>
                <Typography gutterBottom>
                    {t('product_color_what_delete')}?
                </Typography>
                <div><span>{t('product_color_name')}: </span>{item.name}</div>
                <div><span>{t('product_color_describe')}: </span>{item.describe}</div>
                <div><span>{t('product_color_notes')}: </span>{item.notes}</div>
            </DialogContent>
            <hr />
            <DialogActions>
                <Button variant="outlined" color="error" onClick={() => closeOpen(!open)}>{t('close')}</Button>
                <Button variant="contained" color="error" onClick={() => deleteColorProduct()}>{t('delete')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog
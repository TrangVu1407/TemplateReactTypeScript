import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Typography } from '@mui/material';
import productTypeServices from "services/product_type/product_type";
import type { PropsDeleteProductType } from "services/product_type/product_type";
import { dataUpdate } from "./index";
import { messageSnackBar } from "ui-component/Snackbar/index"

interface Props {
    open: boolean;
    closeOpen: (status: boolean) => Promise<void>;
    item: dataUpdate;
    setMessage: React.Dispatch<React.SetStateAction<messageSnackBar>>
}

const InfoDialog: React.FC<Props> = ({ open, closeOpen, item, setMessage }) => {
    const deleteTypeProduct = async () => {
        try {
            let body: PropsDeleteProductType = {
                id: item.id,
            };
            const response = await productTypeServices.delete(body);
            const result = response.data;
            if (result && !result.error) {
                setMessage({ notification: "Xóa lại sản phẩm thành công", severity: "success" })
                let callApi = true;
                closeOpen(callApi);
            } else {
                setMessage({ notification: "Đã xẩy ra lỗi, vui lòng thử lại sau", severity: "error" })
            }
        } catch (e) {
            setMessage({ notification: "Đã xẩy ra lỗi, vui lòng thử lại sau", severity: "error" })
        }
    }

    return (
        <Dialog
            open={open}
            fullWidth={true}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>{"Xóa loại sản phẩm"}</DialogTitle>
            <hr />
            <DialogContent className='dialogDelete'>
                <Typography gutterBottom>
                    Bạn có muốn xóa?
                </Typography>
                <div><span>Loại sản phẩm: </span>{item.name}</div>
                <div><span>Mô tả: </span>{item.describe}</div>
                <div><span>Ghi chú: </span>{item.notes}</div>
            </DialogContent>
            <hr />
            <DialogActions>
                <Button variant="outlined" color="error" onClick={() => closeOpen(!open)}>Đóng</Button>
                <Button variant="contained" color="error" onClick={() => deleteTypeProduct()}>{" Xóa"}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default InfoDialog
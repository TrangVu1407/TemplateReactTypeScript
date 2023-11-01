import React from 'react'
import { Box, TextareaAutosize, TextField, Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import productTypeServices from "services/product_type/product_type";
import type { PropsPostProductType } from "services/product_type/product_type"

interface Props {
    open: boolean;
    closeOpen: (status: boolean) => Promise<void>
}

const InfoDialog: React.FC<Props> = ({ open, closeOpen }) => {
    const [valueTypeProduct, setValueTypeProduct] = React.useState("Quần áo");
    const [valueDescribe, setValueDescribe] = React.useState("")
    const [valueNotes, setValueNotes] = React.useState("")

    React.useEffect(() => {
        setValueTypeProduct("Quần áo");
        setValueDescribe("");
        setValueNotes("");
    }, [open]);

    const createTypeProduct = async () => {
        try {
            let body = {
                shop_id: 1,
                name: valueTypeProduct,
                notes: valueNotes,
                describe: valueDescribe,
            };

            const response = await productTypeServices.create(body);
            const result = response.data;
            if (result && !result.error) {
                let callApp = true;
                closeOpen(callApp);
            } else {

            }
        } catch (e) {

        }
    }

    return (
        <Dialog
            open={open}
            fullWidth={true}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>{"$Thêm mới loại sản phẩm"}</DialogTitle>
            <hr />
            <DialogContent>
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="Tên loại sản phẩm"
                        id="outlined-size-small"
                        size="small"
                        fullWidth
                        value={valueTypeProduct}
                        onChange={e => setValueTypeProduct(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        multiline
                        label="Mô tả"
                        InputProps={{
                            inputComponent: TextareaAutosize,
                            rows: 3
                        }}
                        value={valueDescribe}
                        onChange={e => setValueDescribe(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        multiline
                        label="Ghi chú"
                        InputProps={{
                            inputComponent: TextareaAutosize,
                            rows: 3
                        }}
                        value={valueNotes}
                        onChange={e => setValueNotes(e.target.value)}
                    />
                </Box>
            </DialogContent>
            <hr />
            <DialogActions>
                <Button variant="outlined" onClick={() => closeOpen(!open)}>Đóng</Button>
                <Button variant="contained" onClick={() => createTypeProduct()}>Thêm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default InfoDialog
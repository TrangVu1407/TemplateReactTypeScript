import React from 'react'
import { Box, TextareaAutosize, TextField, Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';

interface Props {
    open: boolean;
    closeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfoDialog: React.FC<Props> = ({ open, closeOpen }) => {
    const [valueTypeProduct, setValueTypeProduct] = React.useState("Quần áo");
    const [valueDescribe, setValueDescribe] = React.useState("")
    const [valueNotes, setValueNotes] = React.useState("")

    React.useEffect(() => {
        setValueTypeProduct("Quần áo");
        setValueDescribe("");
        setValueNotes("");
    },[open]);

    const createTypeProduct = async () => {
        console.warn("valueRef.current.value", `loại sản phẩm: ${valueTypeProduct} - mô tả: ${valueDescribe} - ghi chú: ${valueNotes}`);
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
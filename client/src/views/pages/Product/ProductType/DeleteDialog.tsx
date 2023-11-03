import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText, Typography } from '@mui/material';
import productTypeServices from "services/product_type/product_type";
import type { PropsDeleteProductType } from "services/product_type/product_type"
import { objectUpdate, dataUpdate } from "./index"

interface Props {
    open: boolean;
    closeOpen: (status: boolean) => Promise<void>
    item: dataUpdate;
}

const initState = { name: "", notes: "", describe: "" }
const enum REDUCER_ACTION_TYPE { setData }
type ReducerAction = {
    type: REDUCER_ACTION_TYPE,
    value: objectUpdate,
}
const reducer = (state: typeof initState, action: ReducerAction): typeof
    initState => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.setData:
            return { ...state, name: action.value.name, describe: action.value.describe, notes: action.value.notes }
        default:
            throw new Error()
    }
}

const InfoDialog: React.FC<Props> = ({ open, closeOpen, item }) => {
    const [value, setValue] = React.useReducer(reducer, initState);

    React.useEffect(() => {
        setValue({ type: REDUCER_ACTION_TYPE.setData, value: { name: `${item.name}`, notes: `${item.notes}`, describe: `${item.describe}` } })
    }, [open, item.name, item.describe, item.notes]);

    const deleteTypeProduct = async () => {
        try {
            let body: PropsDeleteProductType = {
                id: item.id,
            };

            const response = await productTypeServices.delete(body);
            const result = response.data;
            if (result && !result.error) {
                let callApi = true;
                closeOpen(callApi);
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
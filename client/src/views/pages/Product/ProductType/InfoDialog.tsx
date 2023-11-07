import React from 'react'
import { Box, TextareaAutosize, TextField, Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import productTypeServices from "services/product_type/product_type";
import type { PropsCreateProductType, PropsUpdateProductType } from "services/product_type/product_type"
import { objectUpdate, dataUpdate } from "./index"
import type { typeLocalStorage } from "local-storage/localStorage"

interface Props {
    open: boolean;
    closeOpen: (status: boolean) => Promise<void>
    type: boolean;
    item: dataUpdate;
}
const initState = { name: "", notes: "", describe: "" }
const enum REDUCER_ACTION_TYPE { setData, name, notes, describe }
type ReducerAction = {
    type: REDUCER_ACTION_TYPE,
    value: objectUpdate,
}
const reducer = (state: typeof initState, action: ReducerAction): typeof
    initState => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.setData:
            return { ...state, name: action.value.name, describe: action.value.describe, notes: action.value.notes }
        case REDUCER_ACTION_TYPE.name:
            return { ...state, name: action.value.name }
        case REDUCER_ACTION_TYPE.describe:
            return { ...state, describe: action.value.describe }
        case REDUCER_ACTION_TYPE.notes:
            return { ...state, notes: action.value.notes }
        default:
            throw new Error()
    }
}

const InfoDialog: React.FC<Props> = ({ open, closeOpen, type, item }) => {
    const dataInitState = { name: item.name, notes: item.notes, describe: item.describe }

    const data: typeLocalStorage = JSON.parse(localStorage.getItem("localStorage") || "{}");
    const [value, setValue] = React.useReducer(reducer, dataInitState);
    // loại sản phẩm đã tồn tại
    const [isExisting, setIsExisting] = React.useState(false)
    const [isExistingMesage, setIsExistingMessage] = React.useState("")

    React.useEffect(() => {
        //không cần setValue vè khởi tạo ban đầu đã truyền vào item
        //setValue({ type: REDUCER_ACTION_TYPE.setData, value: { name: `${item.name}`, notes: `${item.notes}`, describe: `${item.describe}` } })
        setIsExisting(false);
        setIsExistingMessage("");
    }, [open]);

    const createTypeProduct = async () => {
        try {
            let body: PropsCreateProductType = {
                shop_id: data.employee.shop_id,
                name: value.name,
                notes: value.notes,
                describe: value.describe,
            };

            const response = await productTypeServices.create(body);
            const result = response.data;
            if (result && !result.error) {
                let callApi = true;
                closeOpen(callApi);
            } else {
                switch (result.code) {
                    case 209:
                        setIsExistingMessage("Thêm mới thất bại. loại sản phẩm đã tồn tại");
                        setIsExisting(true);
                        break;
                    default:
                    // code block
                }
            }
        } catch (e) {
        }
    }

    const updateTypeProduct = async () => {
        try {
            let body: PropsUpdateProductType = {
                shop_id: data.employee.shop_id,
                id: item.id,
                name: value.name,
                notes: value.notes,
                describe: value.describe,
            };

            const response = await productTypeServices.update(body);
            const result = response.data;
            if (result && !result.error) {
                let callApi = true;
                closeOpen(callApi);
            } else {
                switch (result.code) {
                    case 209:
                        setIsExistingMessage("Cập nhật thất bại. loại sản phẩm đã tồn tại");
                        setIsExisting(true);
                        break;
                    default:
                    // code block
                }
            }
        } catch (e) {
        }
    }

    const actionProductType = async () => {
        if (!type) {
            await createTypeProduct();
        } else if (type) {
            await updateTypeProduct();
        }
    }

    return (
        <Dialog
            open={open}
            fullWidth={true}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>{!type ? "Thêm mới loại sản phẩm" : "Cập nhật loại sản phẩm"}</DialogTitle>
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
                        value={value.name}
                        onChange={e => setValue({ type: REDUCER_ACTION_TYPE.name, value: { name: e.target.value, describe: "", notes: "" } })}
                    />
                    <TextField
                        fullWidth
                        multiline
                        label="Mô tả"
                        InputProps={{
                            inputComponent: TextareaAutosize,
                            rows: 3
                        }}
                        value={value.describe}
                        onChange={e => setValue({ type: REDUCER_ACTION_TYPE.describe, value: { name: "", describe: e.target.value, notes: "" } })}
                    />
                    <TextField
                        fullWidth
                        multiline
                        label="Ghi chú"
                        InputProps={{
                            inputComponent: TextareaAutosize,
                            rows: 3
                        }}
                        value={value.notes}
                        onChange={e => setValue({ type: REDUCER_ACTION_TYPE.notes, value: { name: "", describe: "", notes: e.target.value } })}
                    />
                </Box>
            </DialogContent>
            {isExisting && <Box style={{ marginLeft: "20px", color: "red" }}><h4>Trạng thái: {isExistingMesage}</h4></Box>}
            <hr />
            <DialogActions>
                <Button variant="outlined" onClick={() => closeOpen(!open)}>Đóng</Button>
                <Button variant="contained" onClick={() => actionProductType()}>{!type ? "Thêm" : "Cập nhật"}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default InfoDialog
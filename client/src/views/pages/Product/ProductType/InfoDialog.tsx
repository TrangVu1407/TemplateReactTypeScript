import React from 'react'
import { Box, TextareaAutosize, TextField, Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import productTypeServices from "services/product_type/product_type";
import type { PropsCreateProductType, PropsUpdateProductType } from "services/product_type/product_type"
import { objectUpdate, dataUpdate } from "./index"
import type { typeLocalStorage } from "local-storage/localStorage"
import { messageSnackBar } from "ui-component/Snackbar/index"
import { useTranslation } from 'react-i18next';

interface Props {
    open: boolean;
    closeOpen: (status: boolean) => Promise<void>
    type: boolean;
    item: dataUpdate;
    setMessage: React.Dispatch<React.SetStateAction<messageSnackBar>>
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

const InfoDialog: React.FC<Props> = ({ open, closeOpen, type, item, setMessage }) => {
    const { t } = useTranslation();
    const dataInitState = { name: item.name, notes: item.notes, describe: item.describe }

    const data: typeLocalStorage = JSON.parse(localStorage.getItem("localStorage") || "{}");
    const [value, setValue] = React.useReducer(reducer, dataInitState);
    // loại sản phẩm đã tồn tại
    const [isExisting, setIsExisting] = React.useState(false)
    const [isExistingMesage, setIsExistingMessage] = React.useState("")
    // error value
    const [errorValue, setErrorValue] = React.useState(false)
    const [errorValueMesage, setErrorValueMessage] = React.useState("")
    const [errorName, setErrorName] = React.useState('');
    const [errorDescribe, setErrorDescribe] = React.useState('');

    React.useEffect(() => {
        //không cần setValue vè khởi tạo ban đầu đã truyền vào item
        //setValue({ type: REDUCER_ACTION_TYPE.setData, value: { name: `${item.name}`, notes: `${item.notes}`, describe: `${item.describe}` } })
        setIsExisting(false);
        setIsExistingMessage("");
        setErrorValue(false);
        setErrorValueMessage("");
    }, [open]);

    async function checkValue(): Promise<boolean> {
        let check = true;
        if (value.describe.trim() === '' || value.name.trim() === '') {
            setErrorValue(true);
            setErrorValueMessage(`${t('please_input_data')}`);
        } else if (value.describe.trim() !== '' || value.name.trim() !== '') {
            setErrorValue(false);
            setErrorValueMessage("");
            check = false;
        }
        return check;
    }


    async function createTypeProduct() {
        try {
            let error_value = await checkValue();
            if (error_value) {
                return;
            }
            let body: PropsCreateProductType = {
                shop_id: data.employee.shop_id,
                name: value.name,
                notes: value.notes,
                describe: value.describe,
            };
            const response = await productTypeServices.create(body);
            const result = response.data;
            if (result && !result.error) {
                setMessage({ notification: `${t('product_type_create_success')}`, severity: "info" });
                let callApi = true;
                closeOpen(callApi);
            } else {
                switch (result.code) {
                    case 209:
                        setIsExistingMessage(`${t('product_type_create_error_is_existing')}`);
                        setIsExisting(true);
                        break;
                    default:
                        // code block
                        setMessage({ notification: `${t('product_type_connect_error')}`, severity: "error" })
                }
            }
        } catch (e) {
            setMessage({ notification: `${('product_type_connect_error')}`, severity: "error" })
        }
    }

    const updateTypeProduct = async () => {
        try {
            let error_value = await checkValue();
            if (error_value) {
                return;
            }
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
                setMessage({ notification: `${t('product_type_update_success')}`, severity: "success" });
                let callApi = true;
                closeOpen(callApi);
            } else {
                switch (result.code) {
                    case 209:
                        setIsExistingMessage(`${t('product_type_update_error_is_existing')}`);
                        setIsExisting(true);
                        break;
                    default:
                        // code block
                        setMessage({ notification: `${t('product_type_connect_error')}`, severity: "error" })
                }
            }
        } catch (e) {
            setMessage({ notification: `${('product_type_connect_error')}`, severity: "error" })
        }
    }

    const actionProductType = async () => {
        if (!type) {
            await createTypeProduct();
        } else if (type) {
            await updateTypeProduct();
        }
    }
    const handleSubmit = () => {
        if (value.describe.trim() === '') {
            setErrorDescribe(`${t('value_error')}`);
        } else {
            setErrorDescribe("");
        }
        if (value.name.trim() === '') {
            setErrorName(`${t('value_error')}`);
        } else {
            setErrorName("");
        }
    };

    React.useEffect(() => {
        handleSubmit();
        checkValue();
    }, [value.describe, value.name])

    return (
        <Dialog
            open={open}
            fullWidth={true}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>{!type ? `${t('product_type_create_new_title')}` : `${t('product_type_update_title')}`}</DialogTitle>
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
                        label={t('product_type_title')}
                        id="outlined-size-small"
                        size="small"
                        fullWidth
                        inputProps={{
                            required: true,
                        }}
                        value={value.name}
                        error={errorName !== ''}
                        helperText={errorName !== '' ? errorName : null}
                        onChange={e => setValue({ type: REDUCER_ACTION_TYPE.name, value: { name: e.target.value, describe: "", notes: "" } })}
                    />
                    <TextField
                        fullWidth
                        multiline
                        inputProps={{
                            required: true,
                        }}
                        error={errorDescribe !== ''}
                        helperText={errorDescribe !== '' ? errorDescribe : null}
                        label={t('product_type_describe')}
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
                        label={t('product_type_notes')}
                        InputProps={{
                            inputComponent: TextareaAutosize,
                            rows: 3
                        }}
                        value={value.notes}
                        onChange={e => setValue({ type: REDUCER_ACTION_TYPE.notes, value: { name: "", describe: "", notes: e.target.value } })}
                    />
                </Box>
            </DialogContent>
            {isExisting && <Box style={{ marginLeft: "20px", color: "red" }}><h4>{t(`${'status'}`)}: {isExistingMesage}</h4></Box>}
            {errorValue && <Box style={{ marginLeft: "20px", color: "orange" }}><h4>{t(`${'attention'}`)}: {errorValueMesage}</h4></Box>}
            <hr />
            <DialogActions>
                <Button variant="outlined" onClick={() => closeOpen(!open)}>{t('close')}</Button>
                <Button variant="contained" onClick={() => actionProductType()}>{!type ? `${t('add')}` : `${t('update')}`}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default InfoDialog
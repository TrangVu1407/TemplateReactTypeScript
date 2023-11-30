import * as React from 'react';
import { DialogActions, DialogContent, DialogTitle, Dialog, Button, TextField, Box, TextareaAutosize } from '@mui/material';

import { format } from 'date-fns';
import TransitionComponent from "ui-component/Dialog/TransitionComponent"
import { useTranslation } from 'react-i18next';
import { objectUpdate, dataUpdate } from "./TableSize"
import type { Size } from "services/product_size/product_size";

interface Props {
    open: boolean;
    type: boolean;
    item: dataUpdate;
    closeOpen: (status: boolean) => Promise<void>;
    setProductSize: React.Dispatch<React.SetStateAction<Size[]>>;
    productSize: Size[];
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

const AlertDialogSlide: React.FC<Props> = ({ open, type, item, closeOpen, setProductSize, productSize }) => {
    const { t } = useTranslation();
    const dataInitState = { name: item.name, notes: item.notes, describe: item.describe }
    const [value, setValue] = React.useReducer(reducer, dataInitState);
    // error value
    const [isExisting, setIsExisting] = React.useState(false)
    const [isExistingMesage, setIsExistingMessage] = React.useState("")
    const [errorValue, setErrorValue] = React.useState(false)
    const [errorValueMesage, setErrorValueMessage] = React.useState("")
    const [errorName, setErrorName] = React.useState('');
    const [errorDescribe, setErrorDescribe] = React.useState('');

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
        let error_value = await checkValue();
        if (error_value) {
            return;
        }
        let body = {
            id: `newId-${format(new Date(), 'yyyyMMddhhmmss')}`,
            name: value.name,
            notes: value.notes,
            describe: value.describe,
            status: "addNew",
        };
        let data = [];
        data.push(body);
        for (let i = 0; i < productSize.length; i++) {
            data.push(productSize[i]);
            if (value.name === productSize[i].name || value.describe === productSize[i].describe) {
                setIsExistingMessage(`${t('product_type_create_error_is_existing')}`);
                setIsExisting(true);
                return;
            }
        }
        setProductSize(data);
        closeOpen(false);
    }

    const updateTypeProduct = async () => {
        let error_value = await checkValue();
        if (error_value) {
            return;
        }
        let data = [];
        let body = {
            id: item.id,
            name: value.name,
            describe: value.describe,
            notes: item.notes,
            status: "update",
        };
        data.push(body);
        for (let i = 0; i < productSize.length; i++) {
            if (productSize[i].id !== item.id) {
                data.push(productSize[i]);
            }
        }
        setProductSize(data);
        closeOpen(false);
    }

    const actionProductType = async () => {
        if (!type) {
            await createTypeProduct();
        } else if (type) {
            await updateTypeProduct();
        }
    }
    React.useEffect(() => {
        handleSubmit();
        checkValue();
    }, [value.describe, value.name, handleSubmit, checkValue])
    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={TransitionComponent}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>{!type ? `${t('product_size_info_dialog_create_new_title')}` : `${t('product_size_info_dialog_update_title')}`}</DialogTitle>
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
        </React.Fragment>
    );
}

export default AlertDialogSlide;
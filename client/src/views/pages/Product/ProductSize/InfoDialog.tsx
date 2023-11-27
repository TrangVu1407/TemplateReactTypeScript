import React from 'react'
import { objectUpdate, dataUpdate } from "./index"
import { messageSnackBar } from "ui-component/Snackbar/index"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Autocomplete, TextareaAutosize } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { typeLocalStorage } from "local-storage/localStorage";
import productTypeServices from "services/product_type/product_type";
import type { PropsGetProductType } from "services/product_type/product_type";
import TableSize from "./Size_v1/TableSize";
import LoadingButton from '@mui/lab/LoadingButton';
import productSizeServices from "services/product_size/product_size";
import type { PropsCreateProductSize, PropsUpdateProductSize, Size } from "services/product_size/product_size";
import type { Type } from "./index"

interface Props {
    open: boolean;
    closeOpen: (status: boolean) => Promise<void>
    type: boolean;
    item: dataUpdate;
    setMessage: React.Dispatch<React.SetStateAction<messageSnackBar>>;
    listData: Type[];
    setType: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Option {
    id: number;
    describe: string;
    notes: string;
}

const InfoDialog: React.FC<Props> = ({ open, closeOpen, type, item, setMessage, listData, setType }) => {
    const { t } = useTranslation();
    const data: typeLocalStorage = JSON.parse(localStorage.getItem("localStorage") || "{}");
    const [errorValue, setErrorValue] = React.useState(false)
    const [errorValueMesage, setErrorValueMessage] = React.useState("")
    const actionProductType = async () => {
        if (!type) {
            await createSizeProduct();
        } else if (type) {
            await updateSizeProduct();
        }
    }
    async function createSizeProduct() {
        try {
            if (productSize.length === 0) {
                setErrorValue(true);
                setErrorValueMessage(`${t('please_input_data')}`);
                return;
            }
            for (let i = 0; i < productSize.length; i++) {
                delete productSize[i].id;
                delete productSize[i].status;
                productSize[i].shop_id = data.employee.shop_id;
                productSize[i].product_type_id = productType.id;
            }

            let body: PropsCreateProductSize = {
                product_sizes: productSize,
            };
            const response = await productSizeServices.create(body);
            const result = response.data;
            if (result && !result.error) {
                setMessage({ notification: `${t('product_type_create_success')}`, severity: "info" });
                let callApi = true;
                closeOpen(callApi);
            } else {
                // code block
                setMessage({ notification: `${t('product_type_connect_error')}`, severity: "error" })
            }
        } catch (e) {
            setMessage({ notification: `${('product_type_connect_error')}`, severity: "error" })
        }
    }
    async function updateSizeProduct() {
        if (productSize.length === 0) {
            setErrorValue(true);
            setErrorValueMessage(`${t('please_input_data')}`);
            return;
        }
        let addNew = [];
        let update = [];
        for (let i = 0; i < productSize.length; i++) {
            if (productSize[i].status === "update") {
                delete productSize[i].status;
                update.push(productSize[i]);
            } else if (productSize[i].status === "addNew") {
                delete productSize[i].id;
                delete productSize[i].status;
                addNew.push(productSize[i]);
            }
        }
        let body: PropsUpdateProductSize = { product_sizes: {} }
        if (update.length > 0) {
            body.product_sizes.update = update;
        }
        if (addNew.length > 0) {
            body.product_sizes.addNew = addNew;
        }
        const response = await productSizeServices.update(body);
        const result = response.data;

    }
    const [dataProductType, setDataProductType] = React.useState<Option[]>([]);
    const [productType, setProductType] = React.useState<Option>({ describe: "", notes: "", id: 0 });
    const [loading, setLoading] = React.useState(true);
    const [productSize, setProductSize] = React.useState<Size[]>([]);
    const [deleteProductSize, setDeleteProductSize] = React.useState<[]>([]);
    // loại sản phẩm
    async function getProductType() {
        try {
            const data: typeLocalStorage = JSON.parse(localStorage.getItem("localStorage") || "{}");
            let params: PropsGetProductType = { shop_id: data.employee.shop_id };
            const response = await productTypeServices.getList(params);
            const result = response.data;
            if (result && !result.error) {
                let data = [];
                for (let i = 0; i < result.data.length; i++) {
                    data.push({ label: result.data[i].name, describe: result.data[i].describe, notes: result.data[i].notes, id: result.data[i].id, stt: i + 1 })
                }
                setDataProductType(data);
            } else {
                console.warn(`${t('get_data_error')}`)
            }
        } catch (error: any) {
            console.warn(`${t('connect_error')}`);
        }
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: Option | null) => {
        setProductType({ describe: `${newValue?.describe}`, notes: `${newValue?.notes}`, id: newValue?.id ? newValue?.id : 0 });
        if (newValue?.id) {
            setProductSize([]);
            setType(false);
            for (let i = 0; i < listData.length; i++) {
                if (listData[i].id === newValue?.id) {
                    setProductSize(listData[i].product_sizes);
                    setType(true);
                    setLoading(false);
                    return;
                }
            }
            setLoading(false);
        } else if (!newValue?.id) {
            setProductSize([]);
            setLoading(true);
        }
    };

    React.useEffect(() => {
        getProductType();
    }, []);
    return (
        <Dialog
            open={open}
            fullWidth={true}
            keepMounted
            maxWidth="md"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>{!type ? `${t('product_size_info_dialog_create_new_title')}` : `${t('product_size_info_dialog_update_title')}`}</DialogTitle>
            <hr />
            <DialogContent>
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { mt: 2, mb: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Autocomplete
                        disablePortal
                        size="small"
                        id="combo-box-demo"
                        onChange={handleChange}
                        options={dataProductType}
                        renderInput={(params) => <TextField {...params} label="Loại sản phẩm" InputLabelProps={{
                            ...params.InputLabelProps,
                            children: 'loại sản phẩm',
                        }} />}
                    />
                    <TextField
                        fullWidth
                        multiline
                        label={t('product_size_describe')}
                        InputProps={{
                            inputComponent: TextareaAutosize,
                            rows: 3
                        }}
                        value={productType.describe}
                    />
                    <TextField
                        fullWidth
                        multiline
                        label={t('product_size_notes')}
                        InputProps={{
                            inputComponent: TextareaAutosize,
                            rows: 3
                        }}
                        value={productType.notes}
                    />
                    <TableSize loading={loading} setProductSize={setProductSize} productSize={productSize} setDeleteProductSize={setDeleteProductSize}/>
                </Box>
            </DialogContent>
            {/* // code FE không thể nào trùng với BE nên mã lỗi không trả về FE */}
            {errorValue && <Box style={{ marginLeft: "20px", color: "orange" }}><h4>{t(`${'attention'}`)}: {errorValueMesage}</h4></Box>}
            <hr />
            <DialogActions>
                <Button variant="outlined" onClick={() => closeOpen(!open)}>{t('close')}</Button>
                <LoadingButton loading={loading} variant="contained" onClick={() => actionProductType()}>{!type ? `${t('add')}` : `${t('update')}`}</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default InfoDialog
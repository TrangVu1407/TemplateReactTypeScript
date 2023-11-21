import React from 'react'
import { objectUpdate, dataUpdate } from "./index"
import { messageSnackBar } from "ui-component/Snackbar/index"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Autocomplete, TextareaAutosize } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import type { typeLocalStorage } from "local-storage/localStorage";
import productTypeServices from "services/product_type/product_type";
import type { PropsGetProductType } from "services/product_type/product_type";
import TableSize from "./TableSize"

interface Props {
    open: boolean;
    closeOpen: (status: boolean) => Promise<void>
    type: boolean;
    item: dataUpdate;
    setMessage: React.Dispatch<React.SetStateAction<messageSnackBar>>
}

interface Option {
    id: number | undefined;
    describe: string;
    notes: string;
}

const InfoDialog: React.FC<Props> = ({ open, closeOpen, type, item, setMessage }) => {
    const { t } = useTranslation();
    const actionProductType = async () => {
        if (!type) {
            await createSizeProduct();
        } else if (type) {
            await updateSizeProduct();
        }
    }
    async function createSizeProduct() { }
    async function updateSizeProduct() { }
    const [dataProductType, setDataProductType] = React.useState<Option[]>([]);
    const [productType, setProductType] = React.useState<Option>({ describe: "", notes: "", id: 0 });
    const [loading, setLoading] = React.useState(true);
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
        setProductType({ describe: `${newValue?.describe}`, notes: `${newValue?.notes}`, id: newValue?.id });
        if (newValue?.id) {
            setLoading(false);
        } else if (!newValue?.id) {
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
                    <LoadingButton
                        loading={loading}
                        loadingIndicator="Loading…"
                        variant="contained"
                    >
                        <span>Thêm kích thước sản phẩm</span>
                    </LoadingButton>
                    <TableSize />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={() => closeOpen(!open)}>{t('close')}</Button>
                <Button variant="contained" onClick={() => actionProductType()}>{!type ? `${t('add')}` : `${t('update')}`}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default InfoDialog
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Box, Button, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useTranslation } from 'react-i18next';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import MyCustomToolbar from "ui-component/DataGrid/MyCustomToolbar";
import CustomPagination from "ui-component/DataGrid/CustomPagination";
import InfoDialog from "./InfoDialog";
import { messageSnackBar } from "ui-component/Snackbar/index";
import type { typeLocalStorage } from "local-storage/localStorage";
import type { PropsGetProductSize } from "services/product_size/product_size";
import productSizeServices from "services/product_size/product_size";
import DeleteDialog from "./DeleteDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SnackBar from "ui-component/Snackbar/index";

export interface objectUpdate {
    name: string;
    describe: string,
    notes: string,
}

export interface dataUpdate extends objectUpdate {
    id: number;
    product_type_id: number;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    open: boolean;
    closeOpen: React.Dispatch<React.SetStateAction<boolean>>;
    product_type_name: string;
    product_type_id: number;
}
const Size: React.FC<Props> = ({ open, closeOpen, product_type_name, product_type_id }) => {
    const { t } = useTranslation();

    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
    });
    const columns: GridColDef[] = [
        { field: 'stt', headerName: `${t('no')}`, width: 90, sortable: false, disableColumnMenu: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: `${t('actions')}`,
            width: 120,
            getActions: (item) => {
                return [
                    <GridActionsCellItem icon={<EditIcon color="primary" />} label="Edit" onClick={updateInfoDialog(item)} />,
                    <GridActionsCellItem icon={<DeleteIcon sx={{ color: "red" }} />} label="Delete" onClick={deleteInfoDialog(item)} />,
                ]
            },
        },
        {
            field: 'name',
            headerName: `${t("product_size_name_v1")}`,
            width: 150,
            // không cho thay đổi giá trị bảng
            editable: false,
        },
        {
            field: 'describe',
            headerName: `${t("product_size_describe")}`,
            width: 230,
            // không cho thay đổi giá trị bảng
            editable: false,
        },
        {
            field: 'notes',
            headerName: `${t('product_size_notes')}`,
            width: 270,
            // không cho thay đổi giá trị bảng
            editable: false,
        },
    ];
    //let rows: any[] = [];
    const [rows, setRows] = React.useState<{}[]>([]);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 15,
        page: 0,
    });

    const [openDialog, setOpenDialog] = React.useState(false);
    const [type, setType] = React.useState(false);
    const [itemUpdate, setItemUpdate] = React.useState<dataUpdate>(Object);
    const [openMessage, setOpenMessage] = React.useState(false);
    const [message, setMessage] = React.useState<messageSnackBar>({ notification: "", severity: "success" })
    const [openDelete, setOpenDelete] = React.useState(false);

    const openInfoDialog = async () => {
        setType(false);
        setItemUpdate({ name: "Size M", describe: "Mô tả kích thước", notes: "", id: 0, product_type_id: product_type_id });
        setOpenDialog(true);
    };
    const closeOpenDialog = async (callApi: boolean) => {
        if (callApi) {
            await getProductSize();
            setOpenMessage(true);
        }
        setOpenDialog(false);
    };

    const updateInfoDialog = (item: GridRowParams) => () => {
        setType(true);
        let data = {
            name: item.row.name,
            id: item.row.id,
            product_type_id: product_type_id,
            describe: item.row.describe,
            notes: item.row.notes
        }
        setItemUpdate(data);
        setOpenDialog(true);
    };

    const deleteInfoDialog = (item: GridRowParams) => () => {
        let data = {
            name: item.row.name,
            id: item.row.id,
            product_type_id: product_type_id,
            describe: item.row.describe,
            notes: item.row.notes
        }
        setItemUpdate(data);
        setOpenDelete(true);
    };

    const closeOpenDelete = async (callApi: boolean) => {
        if (callApi) {
            getProductSize();
            setOpenMessage(true);
        }
        setOpenDelete(false);
    };
    const getProductSize = async () => {
        try {
            const data: typeLocalStorage = JSON.parse(localStorage.getItem("localStorage") || "{}");
            let params: PropsGetProductSize = { shop_id: data.employee.shop_id, product_type_id: product_type_id };
            const response = await productSizeServices.getList(params);
            const result = response.data;
            if (result && !result.error) {
                let data = [];
                for (let i = 0; i < result.data.length; i++) {
                    data.push({ name: result.data[i].name, describe: result.data[i].describe, notes: result.data[i].notes, id: result.data[i].id, stt: i + 1 })
                }
                setRows(data);
            } else {
                console.warn(`${t('get_data_error')}`)
            }
        } catch (error: any) {
            console.warn(`${t('connect_error')}`);
        }
    }

    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
            })
        }
        window.addEventListener('resize', handleResize);
        getProductSize();
    }, []);
    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={open}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => closeOpen(!open)}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Loại sản phẩm: {product_type_name}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Box sx={{ height: dimensions.height - 260 }}>
                    <Button variant="outlined" color='success' onClick={openInfoDialog}>Thêm</Button>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        disableRowSelectionOnClick
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        slots={{
                            pagination: CustomPagination,
                            toolbar: MyCustomToolbar,
                        }}
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                    />
                </Box>
                <>{openMessage && (<SnackBar openMessage={openMessage} messsage={message} setOpenMessage={setOpenMessage} />)}</>
                <>{openDialog && <InfoDialog open={open} closeOpenDialog={closeOpenDialog} type={type} item={itemUpdate} setMessage={setMessage} />}</>
                <>{openDelete && <DeleteDialog open={openDelete} closeOpen={closeOpenDelete} item={itemUpdate} setMessage={setMessage} />}</>
            </Dialog>
        </React.Fragment>
    );
}

export default Size
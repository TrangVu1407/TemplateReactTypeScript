import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import LoadingButton from '@mui/lab/LoadingButton';
import InfoDialog from "./InfoDialog_v1";
import MyCustomToolbar from "ui-component/DataGrid/MyCustomToolbar";
import CustomPagination from "ui-component/DataGrid/CustomPagination";
import type { Size } from "services/product_size/product_size";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
    loading: boolean;
    setProductSize: React.Dispatch<React.SetStateAction<Size[]>>;
    productSize: Size[];
    setDeleteProductSize: React.Dispatch<React.SetStateAction<[]>>;
    listData: {};
}

export interface objectUpdate {
    name: string;
    describe: string,
    notes: string,
}

export interface dataUpdate extends objectUpdate {
    id: number;
}

const TableSize: React.FC<Props> = ({ loading, setProductSize, productSize, setDeleteProductSize, listData }) => {
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState(false);
    const [itemUpdate, setItemUpdate] = React.useState<dataUpdate>(Object);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 15,
        page: 0,
    });
    const closeOpen = async () => {
        setOpen(false);
    };

    const openInfoDialog = async () => {
        setType(false);
        setItemUpdate({ name: "Size M", describe: "Quần áo size M", notes: "Dành cho người có cân nặng khoản 45-50kg", id: 0 });
        setOpen(true);
    };

    const columns: GridColDef[] = [
        { field: 'stt', headerName: "STT", width: 90, sortable: false, disableColumnMenu: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Thao tác',
            width: 100,
            getActions: (item) => {
                return [
                    <GridActionsCellItem icon={<EditIcon color="primary" />} label="Edit" onClick={updateInfoDialog(item)} />,
                    <GridActionsCellItem icon={<DeleteIcon sx={{ color: "red" }} />} label="Delete" onClick={deleteInfoDialog(item)} />,
                ]
            },
        },
        {
            field: 'name',
            headerName: 'Kích thước',
            width: 150,
        },
        {
            field: 'describe',
            headerName: 'Mô tả',
            width: 150,
        },
        {
            field: 'notes',
            headerName: 'Ghi chú',
            width: 300,
        },
    ];

    const updateInfoDialog = (item: GridRowParams) => () => {
        setType(true);
        let data = {
            name: item.row.name,
            describe: item.row.describe,
            notes: item.row.notes,
            id: item.row.id,
        }
        setItemUpdate(data);
        setOpen(true);
    };

    const deleteInfoDialog = (item: GridRowParams) => () => {
        // setDeleteProductSize
        for (let i = 0; i < productSize.length; i++) {
            if (productSize[i].id === item.row.id) {
                productSize[i].status = "delete";
            }
        }
        setProductSize(productSize);
    };
    React.useEffect(() => {
        if (listData) {
            setProductSize(listData as Size[]);
        }
    }, [listData]);
    return (
        <Box sx={{ width: '100%', height: '400px' }}>
            <LoadingButton
                loading={loading}
                loadingIndicator="Loading…"
                variant="contained"
                onClick={() => openInfoDialog()}
            >
                <span>Thêm kích thước sản phẩm</span>
            </LoadingButton>
            <DataGrid
                rows={productSize}
                columns={columns}
                disableRowSelectionOnClick
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                slots={{
                    pagination: CustomPagination,
                    toolbar: MyCustomToolbar,
                }}
                //autoHeight
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
            />
            <>{open && <InfoDialog open={open} type={type} item={itemUpdate} closeOpen={closeOpen} setProductSize={setProductSize} productSize={productSize} />}</>
        </Box>
    );
}

export default TableSize
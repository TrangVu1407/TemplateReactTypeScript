import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import LoadingButton from '@mui/lab/LoadingButton';
import InfoDialog from "./InfoDialog_v1";
import MyCustomToolbar from "ui-component/DataGrid/MyCustomToolbar";
import CustomPagination from "ui-component/DataGrid/CustomPagination";
import type { Size } from "services/product_size/product_size";

interface Props {
    loading: boolean;
    setProductSize: React.Dispatch<React.SetStateAction<Size[]>>;
    productSize: Size[];
}

export interface objectUpdate {
    name: string;
    describe: string,
    notes: string,
}

export interface dataUpdate extends objectUpdate {
    id: number;
}

const columns: GridColDef[] = [
    { field: 'stt', headerName: "STT", width: 90, sortable: false, disableColumnMenu: true },
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

const TableSize: React.FC<Props> = ({ loading, setProductSize, productSize }) => {
    const [open, setOpen] = React.useState(false);
    const [itemUpdate, setItemUpdate] = React.useState<dataUpdate>(Object);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 15,
        page: 0,
    });
    const closeOpen = async () => {
        setOpen(false);
    };

    const openInfoDialog = async () => {
        setItemUpdate({ name: "Size M", describe: "Quần áo size M", notes: "Dành cho người có cân nặng khoản 45-50kg", id: 0 });
        setOpen(true);
    };
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
            <>{open && <InfoDialog open={open} type={false} item={itemUpdate} closeOpen={closeOpen} setProductSize={setProductSize} productSize={productSize} />}</>
        </Box>
    );
}

export default TableSize
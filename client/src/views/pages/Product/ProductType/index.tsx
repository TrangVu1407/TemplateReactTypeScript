import * as React from 'react';
import MainProduct from "ui-component/Product/MainProduct"
import { DataGrid, GridColDef, useGridApiContext, useGridSelector, gridPageCountSelector, gridPageSelector, GridActionsCellItem, GridRowParams, } from '@mui/x-data-grid';
import { Box, Pagination, PaginationItem, Button, TextField, Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InfoDialog from "./InfoDialog";
import DeleteDialog from "./DeleteDialog";
import productTypeServices from "services/product_type/product_type";
import type { PropsGetProductType } from "services/product_type/product_type";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { typeLocalStorage } from "local-storage/localStorage"
import SnackBar from "ui-component/Snackbar/index";

export interface objectUpdate {
  name: string;
  describe: string,
  notes: string,
}

export interface dataUpdate extends objectUpdate {
  id: number;
}

const ProductType = () => {
  const columns: GridColDef[] = [
    { field: 'stt', headerName: 'STT', width: 90, sortable: false, disableColumnMenu: true },
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
      headerName: 'Tên',
      width: 150,
      // không cho thay đổi giá trị bảng
      editable: false,
    },
    {
      field: 'describe',
      headerName: 'Mô tả',
      width: 230,
      // không cho thay đổi giá trị bảng
      editable: false,
    },
    {
      field: 'notes',
      headerName: 'Ghi chú',
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
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
  })

  const [open, setOpen] = React.useState(false);
  const [openMessage, setOpenMessage] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [type, setType] = React.useState(false);
  const [itemUpdate, setItemUpdate] = React.useState<dataUpdate>(Object);

  const openInfoDialog = async () => {
    setType(false);
    setItemUpdate({ name: "Quần áo", describe: "", notes: "", id: 0 });
    setOpen(true);
  };
  const closeOpen = async (callApi: boolean) => {
    if (callApi) {
      await getProductType();
      setOpenMessage(true);
    }
    setOpen(false);
  };
  const closeOpenDelete = async (callApi: boolean) => {
    if (callApi) {
      getProductType();
    }
    setOpenDelete(false);
  };

  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
    getProductType();
  }, []);

  const getProductType = async () => {
    try {
      const data: typeLocalStorage = JSON.parse(localStorage.getItem("localStorage") || "{}");
      let params: PropsGetProductType = { shop_id: data.employee.shop_id };
      const response = await productTypeServices.getList(params);
      const result = response.data;
      if (result && !result.error) {
        let data = [];
        for (let i = 0; i < result.data.length; i++) {
          data.push({ name: result.data[i].name, describe: result.data[i].describe, notes: result.data[i].notes, id: result.data[i].id, stt: i + 1 })
        }
        setRows(data);
      } else {
        console.warn("có lỗi trong qúa trình lấy dữ liệu, vui lòng kiểm tra lại")
      }
    } catch (error: any) {
      console.warn("Có lỗi trong quá trình lấy dữ liệu, vui lòng kiểm tra lại đường dẫn");
    }
  }

  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        page={page + 1}
        siblingCount={0}
        count={pageCount}
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event: React.ChangeEvent<unknown>, value: number) =>
          apiRef.current.setPage(value - 1)
        }
      />
    );
  }

  const updateInfoDialog = (item: GridRowParams) => () => {
    setType(true);
    let data = {
      name: item.row.name,
      id: item.row.id,
      describe: item.row.describe,
      notes: item.row.notes
    }
    setItemUpdate(data);
    setOpen(true);
  };

  const deleteInfoDialog = (item: GridRowParams) => () => {
    let data = {
      name: item.row.name,
      id: item.row.id,
      describe: item.row.describe,
      notes: item.row.notes
    }
    setItemUpdate(data);
    setOpenDelete(true);
  };

  return (
    <>
      <MainProduct title="Loại sản phẩm" sx={{ border: 0 }}>
        <Box sx={{ p: 1 }}>
          <TextField
            label="Nhập thông tin"
            id="outlined-size-small"
            defaultValue="Nhập thông tin"
            size="small"
          />
          <Button variant="contained" sx={{ ml: 2 }} onClick={getProductType}>Tìm</Button>
        </Box>

        <Box sx={{ height: dimensions.height - 260 }}>
          <Tooltip title="Tạo mới">
            <Fab size="medium" color="primary" aria-label="add" sx={{ ml: 2, mb: -3 }} onClick={openInfoDialog}>
              <AddIcon />
            </Fab>
          </Tooltip>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            slots={{
              pagination: CustomPagination,
            }}
          />
        </Box>

        <>{openMessage && (<SnackBar openMessage={openMessage} />)}</>
        <>{open && <InfoDialog open={open} closeOpen={closeOpen} type={type} item={itemUpdate} />}</>
        <>{openDelete && <DeleteDialog open={openDelete} closeOpen={closeOpenDelete} item={itemUpdate} />}</>

      </MainProduct>
    </>
  )
}

export default ProductType
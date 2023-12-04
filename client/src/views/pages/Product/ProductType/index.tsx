import * as React from 'react';
import MainProduct from "ui-component/Product/MainProduct";
import { DataGrid, GridColDef, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import { Box, Button, TextField } from '@mui/material';
import InfoDialog from "./InfoDialog";
import DeleteDialog from "./DeleteDialog";
import productTypeServices from "services/product_type/product_type";
import type { PropsGetProductType } from "services/product_type/product_type";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { typeLocalStorage } from "local-storage/localStorage";
import SnackBar from "ui-component/Snackbar/index";
import { messageSnackBar } from "ui-component/Snackbar/index";
import { useTranslation } from 'react-i18next';
import MyCustomToolbar from "ui-component/DataGrid/MyCustomToolbar";
import CustomPagination from "ui-component/DataGrid/CustomPagination";
import IconAdd from "ui-component/Tooltip/IconAdd";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SizeDialog from '../ProductSize';

export interface objectUpdate {
  name: string;
  describe: string,
  notes: string,
}

export interface dataUpdate extends objectUpdate {
  id: number;
}

const ProductType = () => {
  const { t } = useTranslation();
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
          <GridActionsCellItem icon={<BookmarksIcon sx={{ color: "orange" }} />} label="Delete" onClick={openSizeInfoDialog(item)} />,
        ]
      },
    },
    {
      field: 'name',
      headerName: `${t("product_type_name")}`,
      width: 150,
      // không cho thay đổi giá trị bảng
      editable: false,
    },
    {
      field: 'describe',
      headerName: `${t("product_type_describe")}`,
      width: 230,
      // không cho thay đổi giá trị bảng
      editable: false,
    },
    {
      field: 'notes',
      headerName: `${t('product_type_notes')}`,
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
  const [openSize, setOpenSize] = React.useState(false);
  const [openMessage, setOpenMessage] = React.useState(false);
  const [message, setMessage] = React.useState<messageSnackBar>({ notification: "", severity: "success" })
  const [openDelete, setOpenDelete] = React.useState(false);
  const [type, setType] = React.useState(false);
  const [itemUpdate, setItemUpdate] = React.useState<dataUpdate>(Object);

  const openInfoDialog = async () => {
    setType(false);
    setItemUpdate({ name: "Quần áo", describe: "Mô tả sản phẩm", notes: "", id: 0 });
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
      setOpenMessage(true);
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
        console.warn(`${t('get_data_error')}`)
      }
    } catch (error: any) {
      console.warn(`${t('connect_error')}`);
    }
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

  const openSizeInfoDialog = (item: GridRowParams) => () => {
    let data = {
      name: item.row.name,
      id: item.row.id,
      describe: item.row.describe,
      notes: item.row.notes
    }
    setItemUpdate(data);
    setOpenSize(true);
  };

  return (
    <>
      <MainProduct title={t('product_type_title')} sx={{ border: 0 }}>
        <Box sx={{ p: 1 }}>
          <TextField
            label={t('product_type_import_infomations')}
            id="outlined-size-small"
            //defaultValue={t('product_type_import_infomations')}
            size="small"
          />
          <Button variant="contained" sx={{ ml: 2 }} onClick={getProductType}>{t('search')}</Button>
        </Box>

        <Box sx={{ height: dimensions.height - 260 }}>
          <IconAdd title={t('create_new')} openInfoDialog={openInfoDialog} />
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
        <>{open && <InfoDialog open={open} closeOpen={closeOpen} type={type} item={itemUpdate} setMessage={setMessage} />}</>
        <>{openDelete && <DeleteDialog open={openDelete} closeOpen={closeOpenDelete} item={itemUpdate} setMessage={setMessage} />}</>
        <>{openSize && <SizeDialog open={openSize} closeOpen={setOpenSize} product_type_name={itemUpdate.name} product_type_id={itemUpdate.id} />}</>

      </MainProduct>
    </>
  )
}

export default ProductType
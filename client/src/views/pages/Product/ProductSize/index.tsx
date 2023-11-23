import React from 'react'
import MainProduct from "ui-component/Product/MainProduct"
import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import IconAdd from "ui-component/Tooltip/IconAdd";
import {
  DataGridPro,
  GridColDef,
  DataGridProProps,
} from '@mui/x-data-grid-pro';
import { DataGrid } from '@mui/x-data-grid';
import InfoDialog from "./InfoDialog";
import { messageSnackBar } from "ui-component/Snackbar/index";
import type { typeLocalStorage } from "local-storage/localStorage";
import productSizeServices from "services/product_size/product_size";
import type { PropsGetProductSize } from "services/product_size/product_size";

export interface objectUpdate {
  name: string;
  describe: string,
  notes: string,
}

export interface dataUpdate extends objectUpdate {
  id: number;
}

export interface Type {
  id: number;
  product_type_name: string;
  product_type_describe: string;
  product_type_notes: string;
  stt: number;
  product_sizes: [];
}

const ProductSize = () => {
  const { t } = useTranslation();

  const [rows, setRows] = React.useState<Type[]>([]);
  const getProductSize = async () => {
    try {
      const data: typeLocalStorage = JSON.parse(localStorage.getItem("localStorage") || "{}");
      let params: PropsGetProductSize = { shop_id: data.employee.shop_id };
      const response = await productSizeServices.getList(params);
      const result = response.data;
      if (result && !result.error) {
        let data = [];
        for (let i = 0; i < result.data.length; i++) {
          data.push({ product_type_name: result.data[i].product_type_name, product_type_describe: result.data[i].product_type_describe, product_type_notes: result.data[i].product_type_notes, id: result.data[i].id, stt: i + 1, product_sizes: result.data[i].product_sizes })
        }
        setRows(data);
      } else {
        console.warn(`${t('get_data_error')}`)
      }
    } catch (error: any) {
      console.warn(`${t('connect_error')}`);
    }
  }

  // từ data index. viết theo typewscript nên chắc là như vậy.
  type Detail = (typeof rows)[number];
  // cái phần chi tiết sẽ hiện lên
  function DetailPanelContent({ row: rowProp }: { row: Detail }) {
    //header detail
    const columns = React.useMemo<GridColDef[]>(
      () => [
        {
          field: 'stt', headerName: `${t('no')}`, width: 90, sortable: false, disableColumnMenu: true
        },
        {
          field: 'actions',
          type: 'actions',
          headerName: `${t('actions')}`,
          getActions: (item) => {
            return [

            ]
          },
          width: 100,
        },
        {
          field: 'name',
          headerName: `${t("product_size_name")}`,
          width: 150,
          editable: false,
        },
        {
          field: 'describe',
          headerName: `${t("product_size_describe")}`,
          width: 230,
          editable: false,
        },
        {
          field: 'notes',
          headerName: `${t('product_size_notes')}`,
          width: 270,
          editable: false,
        },
      ],
      [],
    );
    // đây sẽ là phần hiện lên phần bấn vào chi tiết
    return (
      <Stack sx={{ py: 2, height: 1, boxSizing: 'border-box' }} direction="column">
        <Paper sx={{ flex: 1, mx: 'auto', width: '90%', p: 1 }}>
          <Stack direction="column" spacing={1} sx={{ height: 1 }}>
            <Typography variant="h6">{`Chi tiết kích thước #${rowProp.product_type_name}`}</Typography>
            <DataGrid
              density="compact"
              autoHeight
              columns={columns}
              rows={rowProp.product_sizes}
              sx={{ flex: 1 }}
              hideFooter
            />
          </Stack>
        </Paper>
      </Stack>
    );
  }

  // header table index
  const columns: GridColDef[] = [
    { field: 'stt', headerName: `${t('no')}`, width: 90, sortable: false, disableColumnMenu: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: `${t('actions')}`,
      getActions: (item) => {
        return [

        ]
      },
      width: 100,
    },
    {
      field: 'product_type_name',
      headerName: `${t("product_size_name")}`,
      width: 150,
      editable: false,
    },
    {
      field: 'product_type_describe',
      headerName: `${t("product_size_describe")}`,
      width: 230,
      editable: false,
    },
    {
      field: 'product_type_notes',
      headerName: `${t('product_size_notes')}`,
      width: 270,
      editable: false,
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [openMessage, setOpenMessage] = React.useState(false);
  const [message, setMessage] = React.useState<messageSnackBar>({ notification: "", severity: "success" });
  const [type, setType] = React.useState(false);
  const [itemUpdate, setItemUpdate] = React.useState<dataUpdate>(Object);

  const openInfoDialog = async () => {
    setOpen(true);
  };
  const closeOpen = async (callApi: boolean) => {
    if (callApi) {
      getProductSize();
    }
    setOpen(false);
  };
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
  })
  // lấy chiều cao của bảng mở rộng
  const getDetailPanelHeight = React.useCallback<
    NonNullable<DataGridProProps['getDetailPanelHeight']>
  >(() => 'auto' as const, []);

  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
    getProductSize();
  }, []);
  return (
    <>
      <MainProduct title={t('product_size_title')} sx={{ border: 0 }}>
        <Box sx={{ p: 1 }}>
          <TextField
            label={t('product_size_import_infomations')}
            id="outlined-size-small"
            size="small"
          />
          <Button variant="contained" sx={{ ml: 2 }}>{t('search')}</Button>
        </Box>

        <Box sx={{ height: dimensions.height - 260 }}>
          <IconAdd title={t('create_new')} openInfoDialog={openInfoDialog} />
          <DataGridPro
            columns={columns}
            rows={rows}
            rowThreshold={0}
            getDetailPanelHeight={getDetailPanelHeight}
            getDetailPanelContent={({ row }) => <DetailPanelContent row={row} />}
          />
        </Box>
        <>{open && <InfoDialog open={open} closeOpen={closeOpen} type={type} item={itemUpdate} setMessage={setMessage} listData={rows} setType={setType}/>}</>
      </MainProduct>
    </>
  )
}

export default ProductSize
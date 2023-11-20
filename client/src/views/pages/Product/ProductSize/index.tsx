import React from 'react'
import MainProduct from "ui-component/Product/MainProduct"
import { Box, Button, TextField, Typography, Paper, Stack, Tooltip, Fab } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import {
  DataGridPro,
  GridColDef,
  DataGridProProps,
} from '@mui/x-data-grid-pro';

// data = [{ID: 1, detail: [{ID_DETAIL: 1.1}] }]
const rows = [
  {
    id: 11,
    customer: 'Bình Văn 12',
    email: "huynhvanbinh1606@gmail.com",
    date: "12/12/20022",
    address: "165/32 Ba Vân, phường 14, quận Tân Bình, HCM city",
    country: "Tân Bình",
    city: "HCM",
    currency: "vnđ",
    products: [{ id: 1, name: "Tân Bình", quantity: 20, unitPrice: 9000 }, { id: 2, name: "Quận 1", quantity: 50, unitPrice: 54000 }],
  }
];

// từ data index. viết theo typewscript nên chắc là như vậy.
type Detail = (typeof rows)[number];
// cái phần chi tiết sẽ hiện lên
function DetailPanelContent({ row: rowProp }: { row: Detail }) {
  //header detail
  const columns = React.useMemo<GridColDef[]>(
    () => [
      { field: 'name', headerName: 'Product', flex: 1, editable: true },
      {
        field: 'quantity',
        headerName: 'Quantity',
        align: 'center',
        headerAlign: 'center',
        type: 'number',
        editable: true,
      },
      { field: 'unitPrice', headerName: 'Unit Price', type: 'number' },
      {
        field: 'total',
        headerName: 'Total',
        type: 'number',
        valueGetter: ({ row }) => row.quantity * row.unitPrice,
      },
    ],
    [],
  );
  // đây sẽ là phần hiện lên phần bấn vào chi tiết
  return (
    <Stack sx={{ py: 2, height: 1, boxSizing: 'border-box' }} direction="column">
      <Paper sx={{ flex: 1, mx: 'auto', width: '90%', p: 1 }}>
        <Stack direction="column" spacing={1} sx={{ height: 1 }}>
          <Typography variant="h6">{`Order #${rowProp.id}`}</Typography>
          <DataGridPro
            density="compact"
            autoHeight
            columns={columns}
            rows={rowProp.products}
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
  { field: 'id', headerName: 'Order ID' },
  { field: 'customer', headerName: 'Customer', width: 200 },
  { field: 'date', type: 'string', headerName: 'Placed at', width: 200 },
  { field: 'currency', headerName: 'Currency' },
];

const ProductSize = () => {
  const { t } = useTranslation();
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
  }, []);
  const openInfoDialog = async () => {
    console.warn("vào đây info dialog");
  };
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
          <Tooltip title={t('create_new')}>
            <Fab size="medium" color="primary" aria-label="add" sx={{ ml: 2, mb: -3 }} onClick={openInfoDialog}>
              <AddIcon />
            </Fab>
          </Tooltip>
          <DataGridPro
            columns={columns}
            rows={rows}
            rowThreshold={0}
            getDetailPanelHeight={getDetailPanelHeight}
            getDetailPanelContent={({ row }) => <DetailPanelContent row={row} />}
          />
        </Box>
      </MainProduct>
    </>
  )
}

export default ProductSize
import React from 'react'
import { Button, Box, Typography, Paper, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  DataGridPro,
  GridColDef,
  DataGridProProps,
} from '@mui/x-data-grid-pro';

const initState = { count: 2 }
const enum REDUCER_ACTION_TYPE { INCREMENT, DECREMENT }
type ReducerAction = {
  type: REDUCER_ACTION_TYPE
}
const reducer = (state: typeof initState, action: ReducerAction): typeof
  initState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 }
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 }
    default:
      throw new Error()
  }
}

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
  const [state, dispatch] = React.useReducer(reducer, initState);
  const increment = () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });
  const decrement = () => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT });

  // lấy chiều cao của bảng mở rộng
  const getDetailPanelHeight = React.useCallback<
    NonNullable<DataGridProProps['getDetailPanelHeight']>
  >(() => 'auto' as const, []);

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h1>Kết quả: {state.count}</h1>

        <Button variant="outlined" onClick={increment}>
          Tăng
        </Button>
        <Button variant="outlined" color="error" onClick={decrement} style={{ marginLeft: "12px" }}>
          Giảm
        </Button>
        <h2>{t('demo_language')}</h2>
        <hr />
        <Box sx={{ width: 1, height: 400, mt: 2 }}>
          <DataGridPro
            columns={columns}
            rows={rows}
            rowThreshold={0}
            getDetailPanelHeight={getDetailPanelHeight}
            getDetailPanelContent={({ row }) => <DetailPanelContent row={row} />}
          />
        </Box>
      </div>
      <hr />
    </>
  )
}

export default ProductSize
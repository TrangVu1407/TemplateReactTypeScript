import * as React from 'react';
import MainProduct from "ui-component/Product/MainProduct"
import { DataGrid, GridColDef, GridValueGetterParams, useGridApiContext, useGridSelector, gridPageCountSelector, gridPageSelector } from '@mui/x-data-grid';
import { Box, Pagination, PaginationItem, Button, TextField } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 10, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 20, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 30, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 40, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 50, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 60, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 70, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 80, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 90, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 11, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 21, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 31, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 41, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 51, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 61, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 71, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 81, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 91, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 12, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 22, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 32, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 42, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 52, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 62, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 72, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 82, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 92, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

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


const ProductType = () => {
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 15,
    page: 0,
  });
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
  })

  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
  }, []);

  return (
    <MainProduct title="Loại sản phẩm" sx={{ border: 0 }}>
      <Box sx={{ p: 1 }}>
        <TextField
          label="Nhập thông tin"
          id="outlined-size-small"
          defaultValue="Nhập thông tin"
          size="small"
        />
        <Button variant="contained" sx={{ ml: 2 }}>Tìm</Button>
      </Box>

      <Box sx={{ height: dimensions.height - 260 }}>
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
    </MainProduct>
  )
}

export default ProductType
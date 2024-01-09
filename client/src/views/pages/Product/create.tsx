import React from 'react';
import { Box, Grid, TextField, TextareaAutosize, RadioGroup, FormControlLabel, Radio, Autocomplete, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Image from './Detail/image';
import { useTranslation } from 'react-i18next';
import CustomPagination from 'ui-component/DataGrid/CustomPagination';
import MyCustomToolbar from 'ui-component/DataGrid/MyCustomToolbar';
import productTypeServices from 'services/product_type/product_type';
import type { PropsGetProductType } from 'services/product_type/product_type';
import type { typeLocalStorage } from 'local-storage/localStorage';
import productSizeServices from 'services/product_size/product_size';
import type { PropsGetProductSize } from 'services/product_size/product_size';
interface Option {
  id: number;
  describe: string;
  notes: string;
  label: string;
}
const Create = () => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: 'stt', headerName: `${t('no')}`, width: 90, sortable: false, disableColumnMenu: true },
    { field: 'name', headerName: `${t('product_size_title')}`, width: 200, sortable: false, disableColumnMenu: true },
    {
      field: 'quantity',
      headerName: `${t('product_quantity')}`,
      width: 230,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(e) => {
            const newValue = parseInt(e.target.value, 10); // Chuyển đổi chuỗi thành số nguyên
            const updatedRows = rows.map((row) =>
              row.id === params.row.id ? { ...row, quantity: newValue } : row
            );
            setRows(updatedRows);
          }}
          size="small"
          fullWidth
          inputProps={{
            required: true,
          }}
          error={Boolean(errorName)}
          helperText={errorName || null}
        />
      )
    },
    {
      field: 'price_purchase',
      headerName: `${t('product_price_purchase')}`,
      width: 230,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(e) => {
            const newValue = parseInt(e.target.value, 10); // Chuyển đổi chuỗi thành số nguyên
            const updatedRows = rows.map((row) =>
              row.id === params.row.id ? { ...row, price_purchase: newValue } : row
            );
            setRows(updatedRows);
          }}
          size="small"
          fullWidth
          inputProps={{
            required: true,
          }}
          error={Boolean(errorName)}
          helperText={errorName || null}
        />
      )
    },
    {
      field: 'price_sell',
      headerName: `${t('product_price_sell')}`,
      width: 230,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(e) => {
            const newValue = parseInt(e.target.value, 10); // Chuyển đổi chuỗi thành số nguyên
            const updatedRows = rows.map((row) =>
              row.id === params.row.id ? { ...row, price_sell: newValue } : row
            );
            setRows(updatedRows);
          }}
          size="small"
          fullWidth
          inputProps={{
            required: true,
          }}
          error={Boolean(errorName)}
          helperText={errorName || null}
        />
      )
    },
  ];

  const initialImages: { featured: boolean; img: string; title: string }[] = [
    {
      featured: false,
      img: 'path_to_image',
      title: 'Image Title',
    },
  ];

  const [images, setImages] = React.useState(initialImages);
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
  });
  const [errorName, setErrorName] = React.useState('');
  const [errorDescribe, setErrorDescribe] = React.useState('');
  const [dataProductType, setDataProductType] = React.useState<Option[]>([]);
  const [productType, setProductType] = React.useState<Option>(dataProductType[0] || { describe: "", notes: "", id: 0, label: "" });
  const [rows, setRows] = React.useState<Option[]>([]);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 15,
    page: 0,
  });

  async function getProductSize(): Promise<void> {
    try {
      const data: typeLocalStorage | null = JSON.parse(localStorage.getItem("localStorage") || "{}");
      if (!data || !data.employee || !data.employee.shop_id) {
        console.warn(`${t('connect_error')}`);
        return;
      }

      const params: PropsGetProductSize = { shop_id: data.employee.shop_id, product_type_id: productType.id };
      const response = await productSizeServices.getList(params);
      const result = response.data;

      if (result && result.data && !result.data.error) {
        const formattedData = result.data.map((item: any, index: number) => ({
          name: item.name,
          describe: item.describe,
          notes: item.notes,
          id: item.id,
          quantity: 0,
          price_purchase: 1000,
          price_sell: 15000,
          is_check: false,
          stt: index + 1,
        }));
        setRows(formattedData);
      } else {
        console.warn(`${t('get_data_error')}`);
      }
    } catch (error: any) {
      console.error(`${t('connect_error')}: ${error.message}`);
    }
  }

  async function getProductType(): Promise<void> {
    try {
      const data: typeLocalStorage | null = JSON.parse(localStorage.getItem("localStorage") || "{}");
      if (!data || !data.employee || !data.employee.shop_id) {
        console.warn(`${t('connect_error')}`);
        return;
      }

      const params: PropsGetProductType = { shop_id: data.employee.shop_id };
      const response = await productTypeServices.getList(params);
      const result = response.data;

      if (result && result.data && !result.data.error) {
        const formattedData = result.data.map((item: any, index: number) => ({
          label: item.name,
          describe: item.describe,
          notes: item.notes,
          id: item.id,
          stt: index + 1,
        }));
        setDataProductType(formattedData);
      } else {
        console.warn(`${t('get_data_error')}`);
      }
    } catch (error: any) {
      console.error(`${t('connect_error')}: ${error.message}`);
    }
  }

  const handleSelectionChange = (newSelectionModel: any) => {
    const updatedRows = rows.map(row => ({
      ...row,
      is_check: newSelectionModel.includes(row.id)
    }));

    setRows(updatedRows);
  };

  const handleChange = async (event: React.ChangeEvent<{}>, newValue: Option | null) => {
    const resetProductType = () => {
      setProductType({ describe: "", notes: "", id: 0, label: "" });
    };

    const updateProductType = () => {
      if (newValue) {
        const { describe, notes, id, label } = newValue;
        setProductType({ describe: `${describe}`, notes: `${notes}`, id: id ? id : 0, label: `${label}` });
      }
    };

    try {
      if (newValue === null) {
        resetProductType();
        setRows([]);
      } else {
        updateProductType();
        await getProductSize();
      }
    } catch (error) {
      console.error("Error in handleChange:", error);
      // Xử lý lỗi ở đây nếu cần
    }
  };

  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    getProductType();
  }, []);
  return (
    <Grid container spacing={2}>
      {/* Left Part: Image Selection */}
      <Grid item xs={12} md={4}>
        <Image images={images} setImages={setImages} />
      </Grid>

      {/* Right Part: Product Information */}
      <Grid item xs={12} md={8}>
        <Box border={1}>
          <Box component="form" noValidate autoComplete="off" sx={{ '& .MuiTextField-root': { margin: 1 }, margin: 2 }}>
            {/* Product Name & Gender Radio Group */}
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item xs={9}>
                <TextField
                  label={t('product_name')}
                  id="outlined-size-small"
                  size="small"
                  fullWidth
                  inputProps={{
                    required: true,
                  }}
                  error={Boolean(errorName)}
                  helperText={errorName || null}
                />
              </Grid>
              <Grid item xs={3}>
                <RadioGroup row name="row-radio-buttons-group">
                  <FormControlLabel value="female" control={<Radio />} label="Nam" />
                  <FormControlLabel value="male" control={<Radio />} label="Nữ" />
                </RadioGroup>
              </Grid>
            </Grid>

            {/* Product Describe & Notes */}
            <TextField
              fullWidth
              multiline
              inputProps={{
                required: true,
              }}
              error={Boolean(errorDescribe)}
              helperText={errorDescribe || null}
              label={t('product_describe')}
              InputProps={{
                inputComponent: TextareaAutosize,
                rows: 3
              }}
            />
            <TextField
              fullWidth
              multiline
              inputProps={{
                required: true,
              }}
              error={Boolean(errorDescribe)}
              helperText={errorDescribe || null}
              label={t('product_notes')}
              InputProps={{
                inputComponent: TextareaAutosize,
                rows: 3
              }}
            />

            {/* Product Type & Describe */}
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  size="small"
                  id="combo-box-demo"
                  onChange={handleChange}
                  value={dataProductType.find(option => option.id === productType.id) || null}
                  options={dataProductType}
                  renderInput={(params) => (
                    <TextField {...params} label="Loại sản phẩm" InputLabelProps={{
                      ...params.InputLabelProps,
                      children: 'loại sản phẩm',
                    }} />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label={t('product_describe_type')}
                  id="outlined-size-small"
                  size="small"
                  fullWidth
                  multiline
                  inputProps={{
                    required: true,
                  }}
                  value={productType.describe}
                  error={Boolean(errorName)}
                  helperText={errorName || null}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={12}>
        <Box border={1}>
          <Box component="form" noValidate autoComplete="off" sx={{ '& .MuiTextField-root': { margin: 1 }, margin: 2 }}>
            Chi tiết sản phẩm
            <Box>
              <DataGrid
                sx={{ height: dimensions.height - 560 }}
                rows={rows}
                columns={columns}
                checkboxSelection
                onRowSelectionModelChange={handleSelectionChange}
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
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={12}>
        <Button variant="outlined">Tạo sản phẩm</Button>
      </Grid>
    </Grid>
  );
}

export default Create
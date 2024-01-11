import React from 'react';
import { Box, Grid, TextField, TextareaAutosize, RadioGroup, FormControlLabel, Radio, Autocomplete, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Image from './Detail/image';
import { useTranslation } from 'react-i18next';
import CustomPagination from 'ui-component/DataGrid/CustomPagination';
import MyCustomToolbar from 'ui-component/DataGrid/MyCustomToolbar';
import productTypeServices from 'services/product_type/product_type';
import type { PropsGetProductType } from 'services/product_type/product_type';
import productServices from 'services/product/product';
import type { PropsCreateProduct } from 'services/product/product';
import type { typeLocalStorage } from 'local-storage/localStorage';
import productSizeServices from 'services/product_size/product_size';
import type { PropsGetProductSize } from 'services/product_size/product_size';
import { messageSnackBar } from "ui-component/Snackbar/index";
import SnackBar from "ui-component/Snackbar/index";
interface Option {
  id: number;
  describe: string;
  notes: string;
  label: string;

}
interface OptionSize {
  id: number;
  is_check: boolean;
  name: string;
  price_purchase: number;
  price_sell: number;
  quantity: number;
}
const Create = () => {
  const { t } = useTranslation();
  const data: typeLocalStorage = JSON.parse(localStorage.getItem("localStorage") || "{}");
  const handleCellValueChange = (
    params: any,
    cellName: string,
    valueFunction: React.Dispatch<React.SetStateAction<OptionSize[]>>,
    allRowErrors: Record<number, { quantity?: string, price_purchase?: string, price_sell?: string }>,
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsedValue = parseInt(e.target.value, 10);
      const newValue = isNaN(parsedValue) ? 0 : parsedValue;
      const rowId = params.row.id;

      let updatedErrors = { ...allRowErrors[rowId] };
      // Kiểm tra nếu is_check được kiểm tra
      if (params.row.is_check) {
        if (cellName === 'quantity') {
          // Xử lý lỗi cho trường quantity
          if (newValue <= 10) {
            updatedErrors.quantity = `${t('value_must_be_greater_than_zero')}`;
          } else {
            delete updatedErrors.quantity;
          }
        } else if (cellName === 'price_purchase') {
          // Xử lý lỗi cho trường price_purchase
          if (newValue <= 10) {
            updatedErrors.price_purchase = `${t('value_must_be_greater_than_zero')}`;
          } else {
            delete updatedErrors.price_purchase;
          }
        } else if (cellName === 'price_sell') {
          // Xử lý lỗi cho trường price_sell
          if (newValue <= 10) {
            updatedErrors.price_sell = `${t('value_must_be_greater_than_zero')}`;
          } else {
            delete updatedErrors.price_sell;
          }
        }
      }
      setAllRowErrors(prevState => ({
        ...prevState,
        [rowId]: updatedErrors,
      }));

      // Cập nhật giá trị cho trường và gọi hàm setRows
      const updatedRows = rows.map((row) =>
        row.id === rowId ? { ...row, [cellName]: newValue } : row
      );
      valueFunction(updatedRows);
    };
  };

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
          onChange={handleCellValueChange(params, 'quantity', setRows, allRowErrors)}
          error={Boolean(allRowErrors[params.row.id]?.quantity)}
          size="small"
          fullWidth
          inputProps={{
            required: true,
          }}
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
          onChange={handleCellValueChange(params, 'price_purchase', setRows, allRowErrors)}
          error={Boolean(allRowErrors[params.row.id]?.price_purchase)}
          size="small"
          fullWidth
          inputProps={{
            required: true,
          }}
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
          onChange={handleCellValueChange(params, 'price_sell', setRows, allRowErrors)}
          error={Boolean(allRowErrors[params.row.id]?.price_sell)}
          size="small"
          fullWidth
          inputProps={{
            required: true,
          }}
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
  const [dataProductType, setDataProductType] = React.useState<Option[]>([]);
  const [productType, setProductType] = React.useState<Option>(dataProductType[0] || { describe: "", notes: "", id: 0, label: "" });
  const [rows, setRows] = React.useState<OptionSize[]>([]);
  const [errorValueMesage, setErrorValueMessage] = React.useState("")
  const [allRowErrors, setAllRowErrors] = React.useState<Record<number, { quantity?: string, price_purchase?: string, price_sell?: string }>>({});
  const [message, setMessage] = React.useState<messageSnackBar>({ notification: "", severity: "success" })
  const [openMessage, setOpenMessage] = React.useState(false);
  type ProductState = {
    product_name: string;
    product_describe: string;
    product_notes: string;
    gender: string;
    // Các thuộc tính khác của state nếu có
  };
  const [value, setValue] = React.useState<ProductState>({ product_name: "Sản phẩm 1", product_describe: "", product_notes: "", gender: "male" });
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
    // Cập nhật trạng thái is_check cho từng hàng
    const updatedRows = rows.map(row => ({
      ...row,
      is_check: newSelectionModel.includes(row.id)
    }));

    // Kiểm tra và cập nhật lỗi cho các hàng
    updatedRows.forEach(row => {
      const errors: { quantity?: string, price_purchase?: string, price_sell?: string } = {};

      if (row.is_check) {
        // Kiểm tra và cập nhật lỗi cho quantity
        if (typeof row.quantity === 'number' && row.quantity <= 10) {
          errors.quantity = `${t('value_must_be_greater_than_zero')}`;
        }

        // Kiểm tra và cập nhật lỗi cho price_purchase
        if (typeof row.price_purchase === 'number' && row.price_purchase <= 10) {
          errors.price_purchase = `${t('value_must_be_greater_than_zero')}`;
        }

        // Kiểm tra và cập nhật lỗi cho price_sell
        if (typeof row.price_sell === 'number' && row.price_sell <= 10) {
          errors.price_sell = `${t('value_must_be_greater_than_zero')}`;
        }
      }

      setAllRowErrors(prevState => ({
        ...prevState,
        [row.id]: errors,
      }));
    });

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

  const handleChangeProduct = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValue(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (value.product_name.trim() === '') {
      setErrorName(`${t('value_error')}`);
    } else {
      setErrorName("");
    }
  };

  async function isProductValid(): Promise<boolean> {
    let hasCheckedRow = false;
    let hasFilledProductName = value.product_name.trim() !== '';

    for (let row of rows) {
      if (row.is_check === true) {
        hasCheckedRow = true;

        // Check if quantity, price_purchase, or price_sell is less than 10
        if (
          typeof row.quantity === 'number' && row.quantity <= 10 ||
          typeof row.price_purchase === 'number' && row.price_purchase <= 10 ||
          typeof row.price_sell === 'number' && row.price_sell <= 10
        ) {
          setErrorValueMessage(t('product_error_invalid_quantity_price'));
          return false;
        }
      }
    }

    if (!hasFilledProductName) {
      setErrorValueMessage(t('please_input_data'));
      return false;
    }

    if (images.length === 1) {
      setErrorValueMessage(t('product_error_image'));
      return false;
    }

    if (!hasCheckedRow) {
      setErrorValueMessage(t('product_error_detail'));
      return false;
    }

    setErrorValueMessage('');
    return true;
  };

  const formatProductImages = () => {
    // bắt đầu từ 1 vì hình ảnh đầu tiên được khởi tạo để tránh lỗi khi code
    return images.slice(1).map(image => ({
      name: image.title,
      img: image.img
    }));
  };

  const formatProductDetails = () => {
    return rows.filter(row => row.is_check).map(row => ({
      product_size_id: row.id,
      price_purchase: row.price_purchase,
      price_sell: row.price_sell,
      quantity: row.quantity
    }));
  };
  const createProduct = async () => {
    try {
      let isValid = await isProductValid();
      if (!isValid) {
        return;
      }

      const productImages = formatProductImages();
      const productDetails = formatProductDetails();

      const productBody: PropsCreateProduct = {
        name: value.product_name,
        describe: value.product_describe,
        notes: value.product_notes,
        shop_id: data.employee.shop_id,
        gender_id: 1,
        product_type_id: productType.id,
        image: productImages,
        product_detail: productDetails
      };
      console.log("productBodyp", productBody);
      const response = await productServices.create(productBody);
      const result = response.data;
      if (result && !result.error) {
        setMessage({ notification: `${t('product_create_success')}`, severity: "success" });
        setOpenMessage(true);
      } else {
        switch (result.code) {
          case 209:
            setErrorValueMessage(`${t('product_create_error_is_existing')}`);
            break;
          default:
            // code block
            setMessage({ notification: `${t('product_create_error_connnect')}`, severity: "error" })
            setOpenMessage(true);
        }
      }
    } catch (e) {
      setMessage({ notification: `${('product_create_error_connnect')}`, severity: "error" })
      setOpenMessage(true);
    }
  };

  React.useEffect(() => {
    handleSubmit();
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    getProductType();
  }, [value.product_name]);
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
                  name="product_name"
                  value={value.product_name}
                  onChange={handleChangeProduct}
                  inputProps={{
                    required: true,
                  }}
                  error={Boolean(errorName)}
                  helperText={errorName || null}
                />
              </Grid>
              <Grid item xs={3}>
                <RadioGroup row name="gender" value={value.gender} onChange={handleChangeProduct}>
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
              name="product_describe"
              value={value.product_describe}
              onChange={handleChangeProduct}
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
              name="product_notes"
              value={value.product_notes}
              onChange={handleChangeProduct}
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
      {errorValueMesage && <Box style={{ marginLeft: "20px", color: "orange", marginTop: "10px" }}><h4>{t(`${'attention'}`)}: {errorValueMesage}</h4></Box>}
      <Grid item xs={12} md={12}>
        <Button variant="outlined" onClick={createProduct}>Tạo sản phẩm</Button>
      </Grid>

      <>{openMessage && (<SnackBar openMessage={openMessage} messsage={message} setOpenMessage={setOpenMessage} />)}</>
    </Grid>
  );
}

export default Create
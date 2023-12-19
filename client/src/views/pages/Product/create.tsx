import React from 'react'
import { Grid, Box, TextField, TextareaAutosize, RadioGroup, FormControlLabel, Radio, Autocomplete } from '@mui/material';
import Image from './Detail/image'
import { useTranslation } from 'react-i18next';
import productTypeServices from "services/product_type/product_type";
import type { PropsGetProductType } from "services/product_type/product_type";
import type { typeLocalStorage } from "local-storage/localStorage";

interface Option {
  id: number;
  describe: string;
  notes: string;
  label: string;
}
const Create = () => {
  const { t } = useTranslation();
  const initialImages: { featured: boolean; img: string; title: string }[] = [
    {
      featured: false,
      img: 'path_to_image',
      title: 'Image Title',
    },
  ];
  const [images, setImages] = React.useState(initialImages);

  const [errorName, setErrorName] = React.useState('');
  const [errorDescribe, setErrorDescribe] = React.useState('');
  const [dataProductType, setDataProductType] = React.useState<Option[]>([]);
  const [productType, setProductType] = React.useState<Option>({ describe: "", notes: "", id: 0, label: "" });
  // loại sản phẩm
  async function getProductType() {
    try {
      const data: typeLocalStorage = JSON.parse(localStorage.getItem("localStorage") || "{}");
      let params: PropsGetProductType = { shop_id: data.employee.shop_id };
      const response = await productTypeServices.getList(params);
      const result = response.data;
      if (result && !result.error) {
        let data = [];
        for (let i = 0; i < result.data.length; i++) {
          data.push({ label: result.data[i].name, describe: result.data[i].describe, notes: result.data[i].notes, id: result.data[i].id, stt: i + 1 })
        }
        setDataProductType(data);
      } else {
        console.warn(`${t('get_data_error')}`)
      }
    } catch (error: any) {
      console.warn(`${t('connect_error')}`);
    }
  }


  const handleChange = (event: React.ChangeEvent<{}>, newValue: Option | null) => {
    setProductType({ describe: `${newValue?.describe}`, notes: `${newValue?.notes}`, id: newValue?.id ? newValue?.id : 0, label: `${newValue?.label}` });
  };

  React.useEffect(() => {
    getProductType();
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Image images={images} setImages={setImages} />
      </Grid>

      {/* Right Part */}
      <Grid item xs={8}>
        <Box sx={{ border: 1 }}>
          <Box component="form" noValidate
            autoComplete="off" sx={{ '& .MuiTextField-root': { margin: 1 }, margin: 2 }}>
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
                  error={errorName !== ''}
                  helperText={errorName !== '' ? errorName : null}
                />
              </Grid>
              <Grid item xs={3}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="female" control={<Radio />} label="Nam" />
                  <FormControlLabel value="male" control={<Radio />} label="Nữ" />
                </RadioGroup>
              </Grid>
            </Grid>
            <TextField
              fullWidth
              multiline
              inputProps={{
                required: true,
              }}
              error={errorDescribe !== ''}
              helperText={errorDescribe !== '' ? errorDescribe : null}
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
              error={errorDescribe !== ''}
              helperText={errorDescribe !== '' ? errorDescribe : null}
              label={t('product_notes')}
              InputProps={{
                inputComponent: TextareaAutosize,
                rows: 3
              }}
            />
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  size="small"
                  id="combo-box-demo"
                  onChange={handleChange}
                  value={productType}
                  options={dataProductType}
                  renderInput={(params) => <TextField {...params} label="Loại sản phẩm" InputLabelProps={{
                    ...params.InputLabelProps,
                    children: 'loại sản phẩm',
                  }} />}
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
                  error={errorName !== ''}
                  helperText={errorName !== '' ? errorName : null}
                />
              </Grid>
            </Grid>
          </Box>


        </Box>
      </Grid>
    </Grid>
  )
}

export default Create
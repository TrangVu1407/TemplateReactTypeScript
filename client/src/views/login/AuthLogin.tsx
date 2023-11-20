import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

import * as Yup from "yup";
import { Formik } from "formik";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useNavigate } from "react-router-dom";

import loginServices from "services/login/login";
import type { PropsLogin } from "services/login/login"

const FirebaseLogin = ({ ...others }) => {
  let navigate = useNavigate();
  const [checked, setChecked] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const [loginError, setLoginError] = useState(false);
  const [connectError, setConnectError] = useState(false);

  return (
    <>
      <Formik
        initialValues={{
          email: "huynhvanbinh1606@gmail.com",
          password: "VanBinh@123",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors }) => {
          let permissions = [
            {
              id: 1, name: "Quản lý - Địa chỉ - Xem", name_sort: "Quản lý - Địa chỉ", screen: "/"
            },
            {
              id: 11, name: "Quản lý - Địa chỉ - Xem", name_sort: "Quản lý - Địa chỉ", screen: "/dashboard"
            },
            {
              id: 12, name: "Quản lý - Địa chỉ - Xem", name_sort: "Quản lý - Địa chỉ", screen: "/product"
            }, {
              id: 31, name: "Quản lý - Địa chỉ - Xem", name_sort: "Quản lý - Địa chỉ", screen: "/demo"
            }, {
              id: 14, name: "Quản lý - Địa chỉ - Xem", name_sort: "Quản lý - Địa chỉ", screen: "/product_type"
            }, {
              id: 16, name: "Quản lý - Địa chỉ - Xem", name_sort: "Quản lý - Địa chỉ", screen: "/product_type_create"
            }, {
              id: 17, name: "Quản lý - Địa chỉ - Xem", name_sort: "Quản lý - Địa chỉ", screen: "/product_type_update"
            }, {
              id: 1, name: "Quản lý - Địa chỉ - Xem", name_sort: "Quản lý - Địa chỉ", screen: "/product_type_delete"
            }, {
              id: 1, name: "Quản lý - Địa chỉ - Xem", name_sort: "Quản lý - Địa chỉ", screen: "/product_size"
            }, {
              id: 1, name: "Quản lý - Địa chỉ - Xem", name_sort: "Quản lý - Địa chỉ", screen: "/product_size_create"
            },
            {
              id: 1, name: "Quản lý - Địa chỉ - Xem", name_sort: "Quản lý - Địa chỉ", screen: "/product_size_update"
            },
            {
              id: 1, name: "Quản lý - Địa chỉ - Xem", name_sort: "Quản lý - Địa chỉ", screen: "/product_size_delete"
            },
          ]
          let data = { permissions: permissions }
          localStorage.setItem(
            "localStorage",
            JSON.stringify(data)
          );
          navigate("/dashboard");
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                Email Address / Username
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ mt: 2 }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: "none", cursor: "pointer" }}
              >
                Forgot Password?
              </Typography>
            </Stack>

            {loginError && (
              <Box>
                <h4 style={{ color: "red" }} >Sai tài khoản hoặc mật khẩu</h4>
              </Box>
            )}

            {connectError && (
              <Box>
                <h4 style={{ color: "red" }} >Không có kết nối, vui lòng kiểm tra lại</h4>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
              >
                Sign in
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;

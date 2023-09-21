import "./login.css"
import { Grid, Paper, Typography, Stack, useMediaQuery } from '@mui/material'
import { useTheme } from "@mui/material/styles";
import AuthLogin from "./AuthLogin";

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const paperStyle = { padding: 30, margin: "20px", maxWidth: "550px" }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid item>
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Typography
              color={theme.palette.secondary.main}
              gutterBottom
              variant={matchDownSM ? "h3" : "h2"}
            >
              Welcome Back
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Login
import { CssBaseline, ThemeProvider, StyledEngineProvider } from '@mui/material';
import { useSelector } from "react-redux";
import Routes from './routes';
import themes from './themes';
import config from "./config"
export interface State {
  customization: {
    themes: boolean;
  }
}

export 

const App = () => {
  let fontFamily = config.fontFamily;

  const customization = useSelector((state: State) => state.customization);
  let darkMode = customization.themes;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes({ darkMode, fontFamily })}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;

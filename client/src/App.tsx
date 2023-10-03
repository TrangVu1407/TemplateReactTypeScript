import { CssBaseline, ThemeProvider, StyledEngineProvider } from '@mui/material';
import { useSelector } from "react-redux";
import Routes from './routes';
import themes from './themes';
export interface State {
  customization: {
    themes: boolean;
    fontFamily: string;
  }
}

const App = () => {
  const customization = useSelector((state: State) => state.customization);
  let darkMode = customization.themes;
  let fontFamily = customization.fontFamily;

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

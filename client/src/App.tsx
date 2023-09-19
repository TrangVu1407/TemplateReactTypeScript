import { CssBaseline, StyledEngineProvider } from '@mui/material';

import Routes from './routes';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Routes />
    </StyledEngineProvider>
  );
};

export default App;

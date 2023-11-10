import React from 'react'
import { CssBaseline, ThemeProvider, StyledEngineProvider } from '@mui/material';
import { useSelector } from "react-redux";
import Routes from 'routes';
import themes from 'themes';
import "./views/pages/pages.sass"

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: require('./local-storage/i18n/en/en.json')
      },
      vn: {
        translation: require('./local-storage/i18n/vn/vn.json')
      }
    },
    lng: 'vn', // default language
    interpolation: {
      escapeValue: false
    }
  });

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

import React from 'react';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import { I18nextProvider } from 'react-i18next';
import { Select, MenuItem } from '@mui/material';
import store from '../redux/store';
import Weather from './Weather/WeatherApp';
import i18n from '../i18n'; 

function App() {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400&display=swap" rel="stylesheet" />
      </Helmet>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <div style={{textAlign:'right'}}>
            <Select defaultValue="en">
              <MenuItem value="en" onClick={() => i18n.changeLanguage('en')}>EN</MenuItem>
              <MenuItem value="uk" onClick={() => i18n.changeLanguage('uk')}>UA</MenuItem>
              <MenuItem value="he" onClick={() => i18n.changeLanguage('he')}>HE</MenuItem>
            </Select>
          </div>
          <Weather />
        </I18nextProvider>
      </Provider>
    </>
  );
}

export default App;

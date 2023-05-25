import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Navigation } from './navigation/Navigation';
import { store } from './store';
import './localization';
import { Layout } from './layout';
import { ThemeProvider } from './theming';
import { LocalizationInitiator } from './localization/LocalizationInitiator';
import { Initializer } from './store/Initializer';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Initializer />
        <LocalizationInitiator />
        <ThemeProvider>
          <Layout>
            <Navigation />
          </Layout>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Navigation } from 'src/app/navigation/Navigation';
import { LocalizationInitiator } from 'src/app/localization/LocalizationInitiator';
import { Initializer } from 'src/app/store/Initializer';
import { store } from './store';
import './localization';
import { Layout } from '../widgets/Layout';
import { ThemeProvider } from './theming';
import { ClientProvider } from './client';
import { Head } from './Head';

function App() {
  return (
    <BrowserRouter>
      <ClientProvider>
        <Provider store={store}>
          <Head />
          <Initializer />
          <LocalizationInitiator />
          <ThemeProvider>
            <Layout>
              <Navigation />
            </Layout>
          </ThemeProvider>
        </Provider>
      </ClientProvider>
    </BrowserRouter>
  );
}

export default App;

import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { Navigation } from './navigation/Navigation';
import { store } from './store'
import './localization';
import { Layout } from './layout';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Layout>
          <Navigation />
        </Layout>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

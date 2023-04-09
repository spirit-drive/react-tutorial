import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './navigation/Navigation';
import './localization';
import { Layout } from './layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Navigation />
      </Layout>
    </BrowserRouter>
  );
}

export default App;

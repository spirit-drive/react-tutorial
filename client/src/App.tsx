import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './navigation/Navigation';
import './localization';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
}

export default App;

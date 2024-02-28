import 'symbol-observable';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import 'src/app/styles/index.sass';
import App from './app/App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

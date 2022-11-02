/* eslint-disable no-unused-vars */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
// import AppAxiosNoHook from './app-axios-no-hook/App';
// import AppAxiosWithHook from './app-axios-with-hook/App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
    {/* <AppAxiosNoHook /> */}
    {/* <AppAxiosWithHook /> */}
  </StrictMode>,
);

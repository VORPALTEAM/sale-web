import React from 'react';
import ReactDOM from 'react-dom/client';
import Model3D from './model';
import './style/app.scss'
import Page from './page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
       <Model3D />
       <Page />
  </React.StrictMode>
);

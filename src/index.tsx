import React from 'react';
import ReactDOM from 'react-dom/client';
import Model3D from './model';
import './style.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
       <Model3D />
  </React.StrictMode>
);

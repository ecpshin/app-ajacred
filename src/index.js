import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GeralContextProvider } from './contexts/GeralContext';
import { ModalContextProvider } from './contexts/ModalContext';
import AppRoutes from './AppRoutes';
import './geral.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GeralContextProvider>
        <ModalContextProvider>
          <AppRoutes />
        </ModalContextProvider>
      </GeralContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

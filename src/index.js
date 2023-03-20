import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './geral.css';
import { GeralContextProvider } from './contexts/GeralContext';
import Header from './components/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='container-fluid'>
        <GeralContextProvider>
          <Header />
          <AppRoutes />
        </GeralContextProvider>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

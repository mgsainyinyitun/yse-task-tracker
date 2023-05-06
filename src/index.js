import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import 'react-circular-progressbar/dist/styles.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <ProSidebarProvider>
          <App />
      </ProSidebarProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
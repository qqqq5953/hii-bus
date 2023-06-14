import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
// import { FavoriteContextProvider } from './store/FavoritesContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <FavoriteContextProvider>
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
  // </FavoriteContextProvider>
);



import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/authContext';
import { PlayProvider } from './context/playContext';
import { Provider } from 'react-redux'
import './index.css';
import { RoutesSpotify } from './routes';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // <React.StrictMode>
  <Provider store={store}>
    <AuthProvider>
    <PlayProvider>
      <RoutesSpotify />
    </PlayProvider>
  </AuthProvider>
  </Provider>
  
    
  // </React.StrictMode>

);


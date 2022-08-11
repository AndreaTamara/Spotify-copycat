import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/authContext';
import { PlayProvider } from './context/playContext';
import './index.css';
import { RoutesSpotify } from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // <React.StrictMode>
  <AuthProvider>
    <PlayProvider>
      <RoutesSpotify />
    </PlayProvider>
  </AuthProvider>
    
  // </React.StrictMode>

);


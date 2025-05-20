import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './Global.css'; 
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import { Auth0Provider } from '@auth0/auth0-react';  // Importamos Auth0Provider
import 'leaflet/dist/leaflet.css';



// Crear el root para React 18 y renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root')); // Crear un 'root'

// Configura tu dominio y client ID de Auth0 (cópiarlo desde el Dashboard de Auth0 en la web)
const domain = "sumerdelivery2025.us.auth0.com";  
const clientId = "leQENvmSAFYmSUCxsrJAuJ4KnMLPCZlE";        

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);

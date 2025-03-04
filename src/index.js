import React from 'react';
import ReactDOM from 'react-dom/client'; // Usar 'react-dom/client' en lugar de 'react-dom'
import './Global.css'; // Si tienes este archivo de estilos
import App from './App'; // Tu componente principal
import { BrowserRouter } from 'react-router-dom'; // Asegúrate de envolver la aplicación con BrowserRouter

// Crear el root para React 18 y renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root')); // Crear un 'root'
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

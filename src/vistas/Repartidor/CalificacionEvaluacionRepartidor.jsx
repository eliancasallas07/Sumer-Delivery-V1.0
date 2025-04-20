import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import '../../estilos/Repartidor/CalificacionEvaluacionRepartidor.css'; // Los estilos
import '../../Global.css'; // Los estilos

const CalificacionEvaluacionRepartidor = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();  // Inicializar useNavigate

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  const pedidos = [
    {
      numero: "101",
      fecha: "2023-10-05",
      hora: "09:00 AM",
      estado: "Entregado",
      detalle: "Paquete pequeño",
      total: "$20,000",
      servicioKm: "$2,000",
      observaciones: "Entrega rápida y eficiente",
      calificacion: Math.floor(Math.random() * 10) + 1,
    },
    {
      numero: "102",
      fecha: "2023-10-06",
      hora: "02:30 PM",
      estado: "En camino",
      detalle: "Documentos importantes",
      total: "$15,000",
      servicioKm: "$1,500",
      observaciones: "Cliente solicitó cuidado especial",
      calificacion: Math.floor(Math.random() * 10) + 1,
    },
    {
      numero: "103",
      fecha: "2023-10-07",
      hora: "07:45 PM",
      estado: "Cancelado",
      detalle: "Pedido de comida",
      total: "$25,000",
      servicioKm: "$2,500",
      observaciones: "Cancelado por el cliente",
      calificacion: Math.floor(Math.random() * 10) + 1,
    },
  ];

  return (
    <div>
      {/* Header */}
      <header className="home-header">
        <div className="home-header-logo">
          <img src={require('../../activos/Logotipo.png')} alt="Logo Sumer" className="header-logo" />
        </div>
        <div className="home-header-left">
          <h1>Sumer Delivery Usuario Repartidor</h1>
        </div>

           {/* Botones de inicio, regresar, cerrar sesión y switch */}
           <div className="header-buttons">
          <button className="button-inicio" onClick={() => navigate('/InicioRepartidor')}>
            <img src={require('../../activos/boton-inicio.png')} alt="Inicio" className="button-icon-inicio" /> Inicio
          </button>
          <button className="button-regresar" onClick={() => navigate(-1)}>
            <img src={require('../../activos/boton-regresar.png')} alt="Regresar" className="button-icon-regresar" /> Regresar
          </button>
          <button className="button-cerrarsesion" onClick={() => navigate('/login')}>
            <img src={require('../../activos/boton-cerrarsesion.png')} alt="Cerrar sesión" className="button-icon-cerrarsesion" /> Cerrar sesión
          </button>

          {/* Interruptor de conexión */}
          <div className="connection-status">
            <div className="switch-container" onClick={handleSwitchToggle}>
              <div className={`switch ${isConnected ? 'active' : ''}`}></div>
            </div>
            <span className={`status-text ${isConnected ? 'connected' : 'disconnected'}`}>
              {isConnected ? 'Conectado' : 'Desconectado'}
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        <h2>Calificación y Evaluación</h2>
        <div className="table-container">
          <table className="pedido-table">
            <thead>
              <tr>
                <th>Número de Pedido</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Detalle de Pedido</th>
                <th>Total</th>
                <th>Valor de Servicio (Km)</th>
                <th>Observaciones</th>
                <th>Mi Calificación (1 a 10)</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido, index) => (
                <tr key={index}>
                  <td data-label="Número de Pedido">{pedido.numero}</td>
                  <td data-label="Fecha">{pedido.fecha}</td>
                  <td data-label="Hora">{pedido.hora}</td>
                  <td data-label="Estado">{pedido.estado}</td>
                  <td data-label="Detalle de Pedido">{pedido.detalle}</td>
                  <td data-label="Total">{pedido.total}</td>
                  <td data-label="Valor de Servicio (Km)">{pedido.servicioKm}</td>
                  <td data-label="Observaciones">{pedido.observaciones}</td>
                  <td data-label="Calificación (1 a 10)">{pedido.calificacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Sumer Delivery - Todos los derechos reservados</p>
        <div className="social-links">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={require('../../activos/instagram.png')} alt="Logo Instagram" className="instagram" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={require('../../activos/facebook.png')} alt="Logo Facebook" className="facebook" />
          </a>
          <a href="mailto:tu_correo@ejemplo.com" target="_blank" rel="noopener noreferrer">
            <img src={require('../../activos/correoelectronico.png')} alt="Logo Correo Electrónico" className="correoelectronico" />
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
            <img src={require('../../activos/tiktok.png')} alt="Logo TikTok" className="tiktok" />
          </a>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
            <img src={require('../../activos/whatsapp.png')} alt="Logo WhatsApp" className="whatsapp" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default CalificacionEvaluacionRepartidor;
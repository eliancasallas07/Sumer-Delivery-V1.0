import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import '../../estilos/Comprador/InicioComprador.css'; // Los estilos
import '../../Global.css'; // Los estilos

const InicioComprador = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();  // Inicializar useNavigate

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  const handleGestionPedidosClick = () => {
    console.log("Redirigiendo a /GestionPedidosComprador");  // Ver si el mensaje aparece en la consola
    navigate('/GestionPedidosComprador');
  };

  const handleNotificacionesClick = () => {
    console.log("Redirigiendo a /Notificaciones");
    navigate('/NotificacionesConfiguracion');
  };

  const handleCalificacionEvaluacionClick = () => {
    console.log("Redirigiendo a /CalificacionEvaluacion");
    navigate('/CalificacionEvaluacion');
  };

  return (
    <div>
      {/* Header */}
      <header className="home-header">
        <div className="home-header-logo">
          <img src={require('../../activos/Logotipo.png')} alt="Logo Sumer" className="header-logo" />
        </div>
        <div className="home-header-left">
          <h1>Bienvenido a Sumer Delivery Usuario Comprador</h1>
        </div>

           {/* Botones de inicio, regresar, cerrar sesión y switch */}
           <div className="header-buttons">
          <button className="button-inicio" onClick={() => navigate('/InicioComprador')}>
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
        <h2>Inicio</h2>

        {/* Botones */}
        <div className="main-buttons">
          <button className="button-gestionPedidos" 
          onClick={handleGestionPedidosClick}
          >
            Gestión de Pedidos
          </button>
          <button className="button-notificaciones" 
          onClick={handleNotificacionesClick}
          >
            Notificaciones
          </button>
          <button className="button-calificacionEvaluacion" 
          onClick={handleCalificacionEvaluacionClick}
          >
            Calificación y Evaluación
          </button>
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

export default InicioComprador ;
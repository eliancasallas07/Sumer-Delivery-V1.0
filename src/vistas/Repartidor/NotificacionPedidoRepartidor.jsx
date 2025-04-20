import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import '../../estilos/Repartidor/NotificacionPedidoRepartidor.css'; // Los estilos
import '../../Global.css'; // Los estilos

const NotificacionPedidoRepartidor = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();  // Inicializar useNavigate

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };


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
        <h2>Notificacion de Pedido</h2>

        {/* Formulario de Pedido */}
        <form>
          <table className="notificacion-pedido">
            <tbody>
              <tr className="form-row">
                <td className="form-title">Nombre:</td>
                <td className="form-input">
                  <input type="text" name="nombre" defaultValue="Juan" readOnly />
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Apellidos:</td>
                <td className="form-input">
                  <input type="text" name="apellidos" defaultValue="Pérez" readOnly />
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Dirección:</td>
                <td className="form-input">
                  <input type="text" name="direccion" defaultValue="Calle 123 #45-67" readOnly />
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Ciudad:</td>
                <td className="form-input">
                  <input type="text" name="ciudad" defaultValue="Bogotá" readOnly />
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Descripción del Pedido:</td>
                <td className="form-input">
                  <textarea name="descripcion" rows="4" defaultValue="Pedido de 3 productos." readOnly></textarea>
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Teléfono:</td>
                <td className="form-input">
                  <input type="tel" name="telefono" defaultValue="3001234567" readOnly />
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Medio de Pago:</td>
                <td className="form-input">
                  <span>Efectivo</span> {/* Mostrar el medio de pago como texto */}
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Número de Repartidor Asignado:</td>
                <td className="form-input">
                  <input type="text" name="numero_repartidor" defaultValue="R001" readOnly />
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Confirmar Entrega:</td>
                <td className="form-input">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="0"
                    className="slider-confirmacion"
                    onChange={(e) => {
                      if (e.target.value === "100") {
                        alert("Confirma Recogida, Redirigiendo al Geolocalizacion Recogida...");
                        navigate("/GeolocalizacionRecogida"); // Redirigir al inicio repartidor
                      }
                    }}
                  />
                  <span className="slider-text">Desliza para confirmar</span>
                </td>
              </tr>
            </tbody>
          </table>
        </form>

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

export default NotificacionPedidoRepartidor;
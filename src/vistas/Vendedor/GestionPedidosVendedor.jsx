import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import '../../estilos/Vendedor/GestionPedidosVendedor.css'; // Los estilos


const GestionPedidosVendedor = () => {
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
          <h1>Sumer Delivery Usuario Vendedor</h1>
        </div>

           {/* Botones de inicio, regresar, cerrar sesión y switch */}
           <div className="header-buttons">
          <button className="button-inicio" onClick={() => navigate('/InicioVendedor')}>
            <img src={require('../../activos/boton-inicio.png')} alt="Inicio" className="button-icon-inicio" /> Inicio
          </button>
          <button className="button-regresar" onClick={() => navigate(-1)}>
            <img src={require('../../activos/boton-regresar.png')} alt="Regresar" className="button-icon-regresar" /> Regresar
          </button>
          <button className="button-cerrarsesion" onClick={() => navigate('/Login')}>
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
        <h2>Gestión de pedidos</h2>
        <div className="gestion-pedidos">
          <table className="pedido-table">
            <thead>
              <tr>
                <th>Confirmar Pedido</th>
                <th>Número de Pedido (ID)</th>
                <th>Fecha</th>
                <th>Número de Repartidor (ID)</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Detalle de Producto</th>
                <th>Total</th>
                <th>Factura</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Confirmar Pedido">
                  <button
                    className="confirmar-btn"
                    onClick={() => {
                      if (window.confirm("¿Quieres confirmar este pedido?")) {
                        alert("Pedido confirmado.");
                        navigate("/NotificacionPedidoVendedor"); // Redirigir a Notificacion Pedido Vendedor
                      }
                    }}
                  >
                    Confirmar
                  </button>
                  <input type="checkbox" id="confirmar-check-1" disabled />
                </td>
                <td data-label="Número de Pedido (ID)">#001</td>
                <td data-label="Fecha">2025-01-20</td>
                <td data-label="Número de Repartidor (ID)">#R001</td>
                <td data-label="Hora">10:00 AM</td>
                <td data-label="Estado">
                  <div className="estado">
                    <span className="estado-texto">En Proceso</span>
                    <img
                      src={require("../../activos/logo-enproceso.png")}
                      alt="Estado"
                      className="estado-icono"
                    />
                  </div>
                </td>
                <td data-label="Detalle de Producto">Producto A</td>
                <td data-label="Total">$50.00</td>
                <td data-label="Factura">
                  <button className="download-button">Descargar</button>
                </td>
              </tr>
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

export default GestionPedidosVendedor;
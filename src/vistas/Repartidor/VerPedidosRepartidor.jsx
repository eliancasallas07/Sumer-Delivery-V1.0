import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import '../../estilos/Repartidor/VerPedidosRepartidor.css'; // Los estilos
import '../../Global.css'; // Los estilos

const VerPedidosRepartidor = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();  // Inicializar useNavigate

  const pedidos = [
    {
      numero: "301",
      fecha: "2023-10-11",
      hora: "08:00 AM",
      estado: "Entregado",
      total: "$150,000",
    },
    {
      numero: "302",
      fecha: "2023-10-12",
      hora: "12:30 PM",
      estado: "En proceso",
      total: "$90,000",
    },
    {
      numero: "303",
      fecha: "2023-10-13",
      hora: "06:15 PM",
      estado: "Cancelado",
      total: "$0",
    },
    {
      numero: "304",
      fecha: "2023-10-14",
      hora: "10:00 AM",
      estado: "Nuevo Servicio",
      total: "$200,000",
    },
  ];

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  const handleNotificacionPedidoRepartidorClick = () => {
    navigate('/NotificacionPedidoRepartidor');
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
        <h2>Ver mis Pedidos</h2>
        <div className="table-container">
          <table className="pedido-table">
            <thead>
              <tr>
                <th>Número de Pedido</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido, index) => (
                <tr key={index}>
                  <td data-label="Número de Pedido">{pedido.numero}</td>
                  <td data-label="Fecha">{pedido.fecha}</td>
                  <td data-label="Hora">{pedido.hora}</td>
                  <td data-label="Estado">
                    {pedido.estado === "Nuevo Servicio" ? (
                      <img
                        src={require('../../activos/logo-nuevoServicio.png')}
                        alt={pedido.estado}
                        className="estado-icon"
                      />
                    ) : (
                      <img
                        src={require(`../../activos/logo-${pedido.estado.replace(" ", "").toLowerCase()}.png`)}
                        alt={pedido.estado}
                        className="estado-icon"
                      />
                    )}
                    {pedido.estado}
                  </td>
                  <td data-label="Total">{pedido.total}</td>
                  <td data-label="Acción">
                    {pedido.estado === "Nuevo Servicio" && (
                      <button
                        className="confirmar-btn"
                        onClick={handleNotificacionPedidoRepartidorClick}
                      >
                        Confirmar
                      </button>
                    )}
                  </td>
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

export default VerPedidosRepartidor;
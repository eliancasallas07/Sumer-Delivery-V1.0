import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import '../../estilos/Administrador/ConfiguracionNotificaciones.css'; // Los estilos
import '../../Global.css'; // Los estilos

const ConfiguracionNotificaciones = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [usuarioTipo, setUsuarioTipo] = useState('');
  const [sonido, setSonido] = useState(null);
  const [banner, setBanner] = useState(null);

  const navigate = useNavigate();  // Inicializar useNavigate

  // Lista de notificaciones por tipo de usuario
  const notificaciones = {
    comprador: [
      "Confirmación pedido realizado",
      "Pedido en preparación",
      "Pedido listo para envío",
      "Pedido en camino",
      "Actualización de estado",
      "Pedido entregado",
      "Encuesta de satisfacción"
    ],
    vendedor: [
      "Nuevos pedidos",
      "Actualización de pedidos",
      "Problemas del pedido",
      "Estado de la entrega",
      "Feedback y calificaciones",
      "Promociones y ofertas",
      "Soporte y asistencias"
    ],
    repartidor: [
      "Asignación de pedido",
      "Pedido en camino",
      "Problemas de entrega",
      "Estado de la entrega",
      "Actualización de estado",
      "Pedido entregado",
      "Feedback y calificación",
      "Encuesta de satisfacción",
      "Soporte y asistencia"
    ]
  };

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  const handleUsuarioTipoChange = (e) => {
    setUsuarioTipo(e.target.value);
  };

  const handleSonidoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSonido(URL.createObjectURL(file));
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBanner(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="home-header">
        <div className="home-header-logo">
          <img src={require('../../activos/Logotipo.png')} alt="Logo Sumer" className="header-logo" />
        </div>
        <div className="home-header-left">
          <h1>Sumer Delivery Usuario Administrador</h1>
        </div>

        {/* Botones de inicio, regresar, cerrar sesión y switch */}
        <div className="header-buttons">
          <button className="button-inicio" onClick={() => navigate('/inicio')}>
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
        <h2>Configuración de Notificaciones</h2>

        {/* Formulario de selección de tipo de usuario */}
        <div className="usuario-selector">
          <label>Selecciona el tipo de usuario:</label>
          <select onChange={handleUsuarioTipoChange} value={usuarioTipo}>
            <option value="">Seleccione...</option>
            <option value="comprador">Comprador</option>
            <option value="vendedor">Vendedor</option>
            <option value="repartidor">Repartidor</option>
          </select>
        </div>

        {/* Tabla de Notificaciones según el tipo de usuario */}
        {usuarioTipo && (
          <div className="tabla-notificaciones">
            <h3>Tipos de Notificaciones para {usuarioTipo.charAt(0).toUpperCase() + usuarioTipo.slice(1)}</h3>
            <table>
              <thead>
                <tr>
                  <th>Notificación</th>
                  <th>Sonido (MP3)</th>
                  <th>Banner/Alerta (PNG)</th>
                </tr>
              </thead>
              <tbody>
                {notificaciones[usuarioTipo].map((notificacion, index) => (
                  <tr key={index}>
                    <td>{notificacion}</td>
                    <td>
                      <input type="file" accept="audio/mp3" onChange={handleSonidoChange} />
                      {sonido && <audio controls src={sonido}></audio>}
                    </td>
                    <td>
                      <input type="file" accept="image/png" onChange={handleBannerChange} />
                      {banner && <img src={banner} alt="Banner" className="banner-preview" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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

export default ConfiguracionNotificaciones;
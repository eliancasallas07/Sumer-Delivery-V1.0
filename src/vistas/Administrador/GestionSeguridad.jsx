import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import '../../estilos/Administrador/GestionSeguridad.css'; // Los estilos
import '../../Global.css'; // Los estilos

const GestionSeguridad = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [usuarioId, setUsuarioId] = useState('');
  const [documento, setDocumento] = useState('');
  const [usuarioTipo, setUsuarioTipo] = useState('');
  const [datosSeguridad, setDatosSeguridad] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();  // Hook de navegación

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  const handleConsultar = () => {
    setLoading(true);
    // Simulación de datos para la tabla
    setTimeout(() => {
      setLoading(false);
      setDatosSeguridad([
        { id: 1, actividad: 'Monitoreo de actividades', cantidad: 5, detalles: 'Acciones realizadas por el usuario X' },
        { id: 2, actividad: 'Detección de Anomalías', cantidad: 3, detalles: 'Acceso sospechoso de IP' },
        { id: 3, actividad: 'Intentos de acceso no autorizados', cantidad: 2, detalles: 'Intentos fallidos por parte de usuario Y' },
        { id: 4, actividad: 'Cambios en la configuración de seguridad', cantidad: 1, detalles: 'Modificación de contraseñas' },
        { id: 5, actividad: 'Escaneos de seguridad', cantidad: 4, detalles: 'Escaneos semanales realizados' },
        { id: 6, actividad: 'Reportes de vulnerabilidades', cantidad: 2, detalles: 'Vulnerabilidades en sistema X' },
        { id: 7, actividad: 'Registro de incidentes', cantidad: 1, detalles: 'Incidente de acceso no autorizado' },
      ]);
    }, 1000);
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
        <h2>Gestión de Seguridad</h2>

        {/* Formulario para ingresar datos en tabla */}
        <table className="form-table">
          <tbody>
            <tr>
              <td><label>ID Usuario:</label></td>
              <td>
                <input
                  type="text"
                  value={usuarioId}
                  onChange={(e) => setUsuarioId(e.target.value)}
                  placeholder="Ingrese el ID del usuario"
                />
              </td>
            </tr>
            <tr>
              <td><label>Documento:</label></td>
              <td>
                <input
                  type="text"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  placeholder="Ingrese el documento"
                />
              </td>
            </tr>
            <tr>
              <td><label>Tipo de Usuario:</label></td>
              <td>
                <div className="checkbox-container">
                  <label className="checkbox-label">
                    <input
                      type="radio"
                      name="usuarioTipo"
                      onChange={() => setUsuarioTipo('Comprador')}
                      checked={usuarioTipo === 'Comprador'}
                    /> Comprador
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="radio"
                      name="usuarioTipo"
                      onChange={() => setUsuarioTipo('Vendedor')}
                      checked={usuarioTipo === 'Vendedor'}
                    /> Vendedor
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="radio"
                      name="usuarioTipo"
                      onChange={() => setUsuarioTipo('Repartidor')}
                      checked={usuarioTipo === 'Repartidor'}
                    /> Repartidor
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <button className="botonConsulta" onClick={handleConsultar}>
                  Consultar
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Tabla de Seguridad */}
        <h3>Registros de Seguridad</h3>
        <table className="tabla-seguridad">
          <thead>
            <tr>
              <th>ID</th>
              <th>Actividad</th>
              <th>Cantidad</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {datosSeguridad.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{dato.actividad}</td>
                <td>{dato.cantidad}</td>
                <td>{dato.detalles}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default GestionSeguridad;
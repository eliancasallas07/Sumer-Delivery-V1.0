import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import '../../estilos/Administrador/EstadoUsuarios.css'; // Los estilos

const EstadoUsuarios = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [usuarios, setUsuarios] = useState([
    {
      id: "1",
      nombre: "Juan Pérez",
      documento: "123456789",
      estado: "Activo",
      observacion: "",
      rol: "Repartidor",
    },
    {
      id: "2",
      nombre: "María Gómez",
      documento: "987654321",
      estado: "Bloqueado",
      observacion: "",
      rol: "Vendedor",
    },
    // Puedes añadir más usuarios de ejemplo
  ]);
  const navigate = useNavigate();  // Inicializar useNavigate

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  // Función para manejar el cambio de estado
  const handleEstadoChange = (id, newEstado) => {
    setUsuarios(usuarios.map(usuario =>
      usuario.id === id ? { ...usuario, estado: newEstado } : usuario
    ));
  };

  // Función para manejar la modificación de la observación
  const handleObservacionChange = (id, newObservacion) => {
    setUsuarios(usuarios.map(usuario =>
      usuario.id === id ? { ...usuario, observacion: newObservacion } : usuario
    ));
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
        <h2>Estado de Usuarios</h2>

        {/* Tabla de usuarios */}
        <div className="table-container">
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Documento</th>
                <th>Estado</th>
                <th>Motivo / Observación</th>
                <th>Rol</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.documento}</td>
                  <td>
                    <select
                      value={usuario.estado}
                      onChange={(e) => handleEstadoChange(usuario.id, e.target.value)}
                    >
                      <option value="Activo">Activo</option>
                      <option value="Bloqueado">Bloqueado</option>
                      <option value="Suspendido">Suspendido</option>
                      <option value="Eliminado">Eliminado</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={usuario.observacion}
                      onChange={(e) => handleObservacionChange(usuario.id, e.target.value)}
                      placeholder="Observación"
                    />
                  </td>
                  <td>{usuario.rol}</td>
                  <td>
                    <button className="action-btn">Guardar</button>
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

export default EstadoUsuarios;
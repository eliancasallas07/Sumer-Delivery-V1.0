import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import '../../estilos/Administrador/GestionQuejasSugerencias.css'; // Los estilos

const GestionQuejasSugerencias = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [usuarioId, setUsuarioId] = useState('');
  const [documento, setDocumento] = useState('');
  const [usuarioTipo, setUsuarioTipo] = useState(''); // Comprador, Vendedor, Repartidor
  const [datosQuejas, setDatosQuejas] = useState([]);
  const [datosSoporte, setDatosSoporte] = useState([]);
  const [datosChat, setDatosChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook de navegación

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  const handleConsultar = () => {
    setLoading(true);
    // Simulación de consulta para quejas, soporte y chat
    setTimeout(() => {
      setLoading(false);
      // Simulación de datos para cada sección
      setDatosQuejas([
        { id: 1, fecha: '2025-01-15', tipo: usuarioTipo, descripcion: 'Queja sobre entrega', estado: 'Abierto', prioridad: 'Alta', comentarios: 'Requiere atención inmediata', respuesta: 'En proceso', fechaResolucion: '' },
        { id: 2, fecha: '2025-01-16', tipo: usuarioTipo, descripcion: 'Sugerencia de mejora en app', estado: 'Cerrado', prioridad: 'Media', comentarios: 'Enviada al desarrollo', respuesta: 'Mejoras en revisión', fechaResolucion: '2025-01-17' }
      ]);
      console.log(datosQuejas); // Agregar un console log
      setDatosSoporte([
        { id: 101, fecha: '2025-01-14', tipo: usuarioTipo, descripcion: 'Problema con la app', estado: 'En proceso', comentarios: 'Esperando respuesta del equipo técnico', respuestaFinal: 'En revisión', fechaCierre: '' },
        { id: 102, fecha: '2025-01-15', tipo: usuarioTipo, descripcion: 'Pregunta sobre un pedido', estado: 'Resuelto', comentarios: 'Caso cerrado', respuestaFinal: 'Pedido confirmado', fechaCierre: '2025-01-16' }
      ]);
      console.log(datosSoporte); // Agregar un console log
      setDatosChat([
        { fecha: '2025-01-14', usuario: usuarioTipo, mensaje: '¿Dónde está mi pedido?', estado: 'Abierto', accion: 'Responder' },
        { fecha: '2025-01-15', usuario: usuarioTipo, mensaje: 'Quiero saber el estado del soporte', estado: 'Cerrado', accion: 'Reabrir' }
      ]);
      console.log(datosChat); // Agregar un console log
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
          <button className="button-inicio" onClick={() => navigate("/inicio")}>
            <img
              src={require("../../activos/boton-inicio.png")}
              alt="Inicio"
              className="button-icon-inicio"
            />{" "}
            Inicio
          </button>
          <button className="button-regresar" onClick={() => navigate(-1)}>
            <img
              src={require("../../activos/boton-regresar.png")}
              alt="Regresar"
              className="button-icon-regresar"
            />{" "}
            Regresar
          </button>
          <button
            className="button-cerrarsesion"
            onClick={() => navigate("/login")}
          >
            <img
              src={require("../../activos/boton-cerrarsesion.png")}
              alt="Cerrar sesión"
              className="button-icon-cerrarsesion"
            />{" "}
            Cerrar sesión
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

      {/* Secciones organizadas */}
      <main className="main">
        <h2>Gestión de Quejas y Sugerencias</h2>

        {/* Formulario para ingresar datos */}
        <div className="form-container">
          <label>ID Usuario:</label>
          <input
            type="text"
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
            placeholder="Ingrese el ID del usuario"
          />

          <label>Documento:</label>
          <input
            type="text"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            placeholder="Ingrese el documento"
          />

          <div className="checkbox-container">
            <label className="checkbox-label">
              <input type="radio" name="usuarioTipo" onChange={() => setUsuarioTipo('Comprador')} /> Comprador
            </label>
            <label className="checkbox-label">
              <input type="radio" name="usuarioTipo" onChange={() => setUsuarioTipo('Vendedor')} /> Vendedor
            </label>
            <label className="checkbox-label">
              <input type="radio" name="usuarioTipo" onChange={() => setUsuarioTipo('Repartidor')} /> Repartidor
            </label>
          </div>

          <button className="botonConsulta" onClick={handleConsultar}>
            Consultar
          </button>
        </div>

        {/* Secciones de consulta: Reportes, Soporte, Comunicación */}
        <div className="section-container">
          {/* Sección Reportes */}
          <div className="section reportes">
            <h3>Reportes</h3>
            <p><strong>Generar, Visualizar, Actualizar Reportes</strong></p>
            <button>Generar Reportes</button>
            <button>Visualizar Reportes</button>
            <button>Actualizar Reportes</button>
            <button>Obtener Reportes Comprimidos</button>
          </div>

          {/* Sección Soporte */}
          <div className="section soporte">
            <h3>Soporte</h3>
            <p><strong>Visualizar Historial en Soporte</strong></p>
            <button>Ver Historial de Soporte</button>
          </div>

          {/* Sección Comunicación */}
          <div className="section comunicacion">
            <h3>Comunicación</h3>
            <p><strong>Visualizar Chat</strong></p>
            <button>Ver Chat</button>
          </div>
        </div>

        {/* Tabla de Quejas y Sugerencias */}
        <h4>Tabla de Quejas y Sugerencias</h4>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Tipo de Usuario</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>Comentarios</th>
              <th>Respuesta</th>
              <th>Fecha de Resolución</th>
            </tr>
          </thead>
          <tbody>
            {datosQuejas.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{dato.fecha}</td>
                <td>{dato.tipo}</td>
                <td>{dato.descripcion}</td>
                <td>{dato.estado}</td>
                <td>{dato.prioridad}</td>
                <td>{dato.comentarios}</td>
                <td>{dato.respuesta}</td>
                <td>{dato.fechaResolucion}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tabla de Soporte */}
        <h4>Tabla de Soporte</h4>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Tipo de Usuario</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Comentarios</th>
              <th>Respuesta Final</th>
              <th>Fecha de Cierre</th>
            </tr>
          </thead>
          <tbody>
            {datosSoporte.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{dato.fecha}</td>
                <td>{dato.tipo}</td>
                <td>{dato.descripcion}</td>
                <td>{dato.estado}</td>
                <td>{dato.comentarios}</td>
                <td>{dato.respuestaFinal}</td>
                <td>{dato.fechaCierre}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tabla de Chat */}
        <h4>Tabla de Chat</h4>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Usuario</th>
              <th>Mensaje</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {datosChat.map((dato, index) => (
              <tr key={index}>
                <td>{dato.fecha}</td>
                <td>{dato.usuario}</td>
                <td>{dato.mensaje}</td>
                <td>{dato.estado}</td>
                <td>{dato.accion}</td>
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

export default GestionQuejasSugerencias;
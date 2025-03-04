import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import '../../estilos/Administrador/ConfiguracionPreciosPromociones.css'; // Los estilos

const ConfiguracionPreciosPromociones = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [usuarios, setUsuarios] = useState([
    {
      id: "1",
      nombre: "Juan Pérez",
      documento: "123456789",
      estado: "Activo",
      observacion: "",
      rol: "Vendedor",
      tienda: "",
      menu: "",
      ingredientes: "",
      precio: "",
      imagen: "",
      tipoPromocion: "Descuento",
      fechaInicio: "",
      fechaFin: ""
    },
    // Agregar más usuarios de prueba si es necesario
  ]);

  const navigate = useNavigate();  // Inicializar useNavigate

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  const handleEstadoChange = (id, value) => {
    const updatedUsuarios = usuarios.map(usuario => {
      if (usuario.id === id) {
        return { ...usuario, estado: value };
      }
      return usuario;
    });
    setUsuarios(updatedUsuarios);
  };

  const handleObservacionChange = (id, value) => {
    const updatedUsuarios = usuarios.map(usuario => {
      if (usuario.id === id) {
        return { ...usuario, observacion: value };
      }
      return usuario;
    });
    setUsuarios(updatedUsuarios);
  };

  const handleTiendaChange = (id, value) => {
    const updatedUsuarios = usuarios.map(usuario => {
      if (usuario.id === id) {
        return { ...usuario, tienda: value };
      }
      return usuario;
    });
    setUsuarios(updatedUsuarios);
  };

  const handleMenuChange = (id, value) => {
    const updatedUsuarios = usuarios.map(usuario => {
      if (usuario.id === id) {
        return { ...usuario, menu: value };
      }
      return usuario;
    });
    setUsuarios(updatedUsuarios);
  };

  const handleIngredientesChange = (id, value) => {
    const updatedUsuarios = usuarios.map(usuario => {
      if (usuario.id === id) {
        return { ...usuario, ingredientes: value };
      }
      return usuario;
    });
    setUsuarios(updatedUsuarios);
  };

  const handlePrecioChange = (id, value) => {
    const updatedUsuarios = usuarios.map(usuario => {
      if (usuario.id === id) {
        return { ...usuario, precio: value };
      }
      return usuario;
    });
    setUsuarios(updatedUsuarios);
  };

  const handleImagenChange = (id, file) => {
    const updatedUsuarios = usuarios.map(usuario => {
      if (usuario.id === id) {
        return { ...usuario, imagen: file };
      }
      return usuario;
    });
    setUsuarios(updatedUsuarios);
  };

  const handleTipoPromocionChange = (id, value) => {
    const updatedUsuarios = usuarios.map(usuario => {
      if (usuario.id === id) {
        return { ...usuario, tipoPromocion: value };
      }
      return usuario;
    });
    setUsuarios(updatedUsuarios);
  };

  const handleFechaInicioChange = (id, value) => {
    const updatedUsuarios = usuarios.map(usuario => {
      if (usuario.id === id) {
        return { ...usuario, fechaInicio: value };
      }
      return usuario;
    });
    setUsuarios(updatedUsuarios);
  };

  const handleFechaFinChange = (id, value) => {
    const updatedUsuarios = usuarios.map(usuario => {
      if (usuario.id === id) {
        return { ...usuario, fechaFin: value };
      }
      return usuario;
    });
    setUsuarios(updatedUsuarios);
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
        <h2>Configuración de Precios y Promociones</h2>

        <div className="table-container">
          <table className="configuracion-precios-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Documento</th>
                <th>Estado</th>
                <th>Motivo / Observación</th>
                <th>Rol</th>
                <th>Tienda</th>
                <th>Menú</th>
                <th>Ingredientes</th>
                <th>Precio</th>
                <th>Imagen (PDF)</th>
                <th>Tipo de Promoción</th>
                <th>Fecha de Inicio</th>
                <th>Fecha Fin</th>
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
                    <input
                      type="text"
                      value={usuario.tienda}
                      onChange={(e) => handleTiendaChange(usuario.id, e.target.value)}
                      placeholder="Tienda"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={usuario.menu}
                      onChange={(e) => handleMenuChange(usuario.id, e.target.value)}
                      placeholder="Menú"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={usuario.ingredientes}
                      onChange={(e) => handleIngredientesChange(usuario.id, e.target.value)}
                      placeholder="Ingredientes"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={usuario.precio}
                      onChange={(e) => handlePrecioChange(usuario.id, e.target.value)}
                      placeholder="Precio"
                    />
                  </td>
                  <td>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleImagenChange(usuario.id, e.target.files[0])}
                    />
                  </td>
                  <td>
                    <select
                      value={usuario.tipoPromocion}
                      onChange={(e) => handleTipoPromocionChange(usuario.id, e.target.value)}
                    >
                      <option value="Descuento">Descuento</option>
                      <option value="Oferta Especial">Oferta Especial</option>
                      <option value="2x1">2x1</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="date"
                      value={usuario.fechaInicio}
                      onChange={(e) => handleFechaInicioChange(usuario.id, e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={usuario.fechaFin}
                      onChange={(e) => handleFechaFinChange(usuario.id, e.target.value)}
                    />
                  </td>
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

export default ConfiguracionPreciosPromociones;
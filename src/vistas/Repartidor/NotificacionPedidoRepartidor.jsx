import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../estilos/Repartidor/NotificacionPedidoRepartidor.css';
import '../../Global.css';

const NotificacionPedidoRepartidor = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [pedido, setPedido] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera el pedido seleccionado para el repartidor desde localStorage
    const pedidoRepartidor = localStorage.getItem("pedidoRepartidor");
    if (pedidoRepartidor) {
      setPedido(JSON.parse(pedidoRepartidor));
    }
  }, []);

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  if (!pedido) {
    return (
      <div>
        <h2>No hay pedido seleccionado para mostrar.</h2>
        <button onClick={() => navigate("/VerPedidosRepartidor")}>Volver a Pedidos</button>
      </div>
    );
  }

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
        <form>
          <table className="notificacion-pedido">
            <tbody>
              <tr className="form-row">
                <td className="form-title">Nombre:</td>
                <td className="form-input">
                  <input type="text" name="nombre" value={pedido.nombre || ""} readOnly />
                </td>
              </tr>
              {/* Puedes quitar Apellidos/Ciudad si no los necesitas */}
              <tr className="form-row">
                <td className="form-title">Dirección:</td>
                <td className="form-input">
                  <input type="text" name="direccion" value={pedido.direccion || ""} readOnly />
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Descripción del Pedido:</td>
                <td className="form-input">
                  <textarea
                    name="descripcion"
                    rows="4"
                    value={
                      pedido.descripcion ||
                      (pedido.productos
                        ? pedido.productos.map(p => `${p.name} (x${p.quantity})`).join(', ')
                        : "")
                    }
                    readOnly
                  ></textarea>
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Teléfono:</td>
                <td className="form-input">
                  <input type="tel" name="telefono" value={pedido.telefono || ""} readOnly />
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Medio de Pago:</td>
                <td className="form-input">
                  <span>{pedido.medio_pago || "Efectivo"}</span>
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Número de Repartidor Asignado:</td>
                <td className="form-input">
                  <input type="text" name="numero_repartidor" value={pedido.repartidorId || "R001"} readOnly />
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Confirmar Recoleccion:</td>
                <td className="form-input">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="0"
                    className="slider-confirmacion"
                    onMouseUp={(e) => {
                      if (e.target.value === "100") {
                        navigate("/GeolocalizacionRecogida");
                      }
                    }}
                    onTouchEnd={(e) => {
                      if (e.target.value === "100") {
                        navigate("/GeolocalizacionRecogida");
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
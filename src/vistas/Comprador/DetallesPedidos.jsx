import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../../estilos/Comprador/DetallesPedidos.css"; // Los estilos
import '../../Global.css'; // Los estilos

const DetallesPedidos = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div>
      {/* Header */}
      <header className="home-header">
        <div className="home-header-logo">
          <img
            src={require("../../activos/Logotipo.png")}
            alt="Logo Sumer"
            className="header-logo"
          />
        </div>
        <div className="home-header-left">
          <h1>Sumer Delivery Usuario Comprador</h1>
        </div>

        {/* Botones de inicio, regresar, cerrar sesión y switch */}
        <div className="header-buttons">
          <button className="button-inicio" onClick={() => navigate("/InicioComprador")}>
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
              <div className={`switch ${isConnected ? "active" : ""}`}></div>
            </div>
            <span
              className={`status-text ${
                isConnected ? "connected" : "disconnected"
              }`}
            >
              {isConnected ? "Conectado" : "Desconectado"}
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        <h2>Ver Detalles Mis Pedidos</h2>

        {/* Tabla de detalles de pedidos */}
        <div className="table-container">
          <table className="pedido-table">
            <thead>
              <tr>
                <th>Número de Pedido</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Tienda</th>
                <th>Detalle de Pedido</th>
                <th>Observaciones</th>
                <th>Estado</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Número de Pedido">#001</td>
                <td data-label="Fecha">2025-01-20</td>
                <td data-label="Hora">10:00 AM</td>
                <td data-label="Tienda">TACOS BAR Y LEÑA</td>
                <td data-label="Detalle de Pedido">Combo1 six pack aguila + tacos tradicionales</td>
                <td data-label="Observaciones">Exitoso</td>
                <td data-label="Estado">
                  <div className="estado">
                    <span className="estado-texto">Entregado</span>
                    <img
                      src={require("../../activos/logo-entregado.png")}
                      alt="Logo Entregado"
                      className="estado-icono"
                    />
                  </div>
                </td>
                <td data-label="Total">$50.00</td>
              </tr>
              <tr>
                <td data-label="Número de Pedido">#002</td>
                <td data-label="Fecha">2025-01-22</td>
                <td data-label="Hora">02:15 PM</td>
                <td data-label="Tienda">EXITO VIVA CC</td>
                <td data-label="Detalle de Pedido">Cuchilla de afeitar eléctrica + crema de afeitar</td>
                <td data-label="Observaciones">Se demoró más de lo esperado</td>
                <td data-label="Estado">
                  <div className="estado">
                    <span className="estado-texto">En Proceso</span>
                    <img
                      src={require("../../activos/logo-enproceso.png")}
                      alt="Logo En Proceso"
                      className="estado-icono"
                    />
                  </div>
                </td>
                <td data-label="Total">$30.00</td>
              </tr>
              <tr>
                <td data-label="Número de Pedido">#003</td>
                <td data-label="Fecha">2025-01-23</td>
                <td data-label="Hora">04:00 PM</td>
                <td data-label="Tienda">CENTRO GAMER</td>
                <td data-label="Detalle de Pedido">1 Mouse Gamer</td>
                <td data-label="Observaciones">Cancelado por fraude</td>
                <td data-label="Estado">
                  <div className="estado">
                    <span className="estado-texto">Cancelado</span>
                    <img
                      src={require("../../activos/logo-cancelado.png")}
                      alt="Logo Cancelado"
                      className="estado-icono"
                    />
                  </div>
                </td>
                <td data-label="Total">$15.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="TextoFooter">
          <p>© 2025 Sumer Delivery - Todos los derechos reservados</p>
        </div>

        <div className="social-links">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={require("../../activos/instagram.png")}
              alt="Logo Instagram"
              className="instagram"
            />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={require("../../activos/facebook.png")}
              alt="Logo Facebook"
              className="facebook"
            />
          </a>
          <a
            href="mailto:tu_correo@ejemplo.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={require("../../activos/correoelectronico.png")}
              alt="Logo Correo Electrónico"
              className="correoelectronico"
            />
          </a>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={require("../../activos/tiktok.png")}
              alt="Logo TikTok"
              className="tiktok"
            />
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={require("../../activos/whatsapp.png")}
              alt="Logo WhatsApp"
              className="whatsapp"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default DetallesPedidos;

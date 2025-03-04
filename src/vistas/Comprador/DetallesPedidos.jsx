import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../../estilos/Comprador/DetallesPedidos.css"; // Los estilos

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
        <h2>Ver Detalles Mis Pedidos </h2>

        {/* Contenedor de los pedidos */}
        <div className="tabla-pedidos">
          {/* Pedido 1 */}
          <div className="pedido">
            <div className="pedido-titulo">Número de Pedido</div>
            <div className="pedido-dato">#001</div>

            <div className="pedido-titulo">Fecha</div>
            <div className="pedido-dato">2025-01-20</div>

            <div className="pedido-titulo">Hora</div>
            <div className="pedido-dato">10:00 AM</div>

            <div className="pedido-titulo">Tienda</div>
            <div className="pedido-dato">TACOS BAR Y LEÑA</div>

            <div className="pedido-titulo">Detalle de pedido</div>
            <div className="pedido-dato">
              {" "}
              Combo1 six pack aguila + tacos tradionales
            </div>

            <div className="pedido-titulo">Observaciones</div>
            <div className="pedido-dato">Exitoso</div>

            <div className="pedido-titulo">Estado</div>
            <div className="pedido-dato">
              <div className="estado">
                <span className="estado-texto">Entregado</span>
                <img
                  src={require("../../activos/logo-entregado.png")}
                  alt="Logo Entregado"
                  className="estado-icono"
                />
              </div>
            </div>

            <div className="pedido-titulo">Total</div>
            <div className="pedido-dato">$50.00</div>
          </div>

          {/* Pedido 2 */}
          <div className="pedido">
            <div className="pedido-titulo">Número de Pedido</div>
            <div className="pedido-dato">#002</div>

            <div className="pedido-titulo">Fecha</div>
            <div className="pedido-dato">2025-01-22</div>

            <div className="pedido-titulo">Hora</div>
            <div className="pedido-dato">02:15 PM</div>

            <div className="pedido-titulo">Tienda</div>
            <div className="pedido-dato">EXITO VIVA CC</div>

            <div className="pedido-titulo">Detalle de pedido</div>
            <div className="pedido-dato">
              {" "}
              Cuchilla de afeitar electrica + crema de afeitar
            </div>

            <div className="pedido-titulo">Observaciones</div>
            <div className="pedido-dato">Se demoro mas de lo esperado</div>

            <div className="pedido-titulo">Estado</div>
            <div className="pedido-dato">
              <div className="estado">
                <span className="estado-texto">En Proceso</span>
                <img
                  src={require("../../activos/logo-enproceso.png")}
                  alt="Logo En Proceso"
                  className="estado-icono"
                />
              </div>
            </div>

            <div className="pedido-titulo">Total</div>
            <div className="pedido-dato">$30.00</div>
          </div>

          {/* Pedido 3 */}
          <div className="pedido">
            <div className="pedido-titulo">Número de Pedido</div>
            <div className="pedido-dato">#003</div>

            <div className="pedido-titulo">Fecha</div>
            <div className="pedido-dato">2025-01-23</div>

            <div className="pedido-titulo">Hora</div>
            <div className="pedido-dato">04:00 PM</div>

            <div className="pedido-titulo">Tienda</div>
            <div className="pedido-dato">CENTRO GAMER</div>

            <div className="pedido-titulo">Detalle de pedido</div>
            <div className="pedido-dato"> 1 Mouse Gamer</div>

            <div className="pedido-titulo">Observaciones</div>
            <div className="pedido-dato">Cancelado por fraude</div>

            <div className="pedido-titulo">Estado</div>
            <div className="pedido-dato">
              <div className="estado">
                <span className="estado-texto">Cancelado</span>
                <img
                  src={require("../../activos/logo-cancelado.png")}
                  alt="Logo Cancelado"
                  className="estado-icono"
                />
              </div>
            </div>

            <div className="pedido-titulo">Total</div>
            <div className="pedido-dato">$15.00</div>
          </div>
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

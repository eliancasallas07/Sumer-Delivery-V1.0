import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../../estilos/Comprador/GestionPedidosComprador.css"; // Los estilos

const GestionPedidosComprador = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  const handleVerPedidosClick = () => {
    console.log("Redirigiendo a /VerPedidos"); // Ver si el mensaje aparece en la consola
    navigate("/VerPedidos");
  };

  const handleDetallesPedidosClick = () => {
    console.log("Redirigiendo a /DetallesPedidos"); // Ver si el mensaje aparece en la consola
    navigate("/DetallesPedidos");
  };

  const handleRealizarPedidoClick = () => {
    console.log("Redirigiendo a /RealizarPedido"); // Ver si el mensaje aparece en la consola
    navigate("/RealizarPedido");

  };

  const handleCancelarPedidoClick = () => {
    console.log("Redirigiendo a /CancelarPedido"); // Ver si el mensaje aparece en la consola
    navigate("/CancelarPedido");
  };

  const handleGenerarFacturasClick = () => {
    console.log("Redirigiendo a /GenerarFacturas"); // Ver si el mensaje aparece en la consola
    navigate("/GenerarFacturas");
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
        <h2>Gestion de Pedidos</h2>

        {/* Botones de Ver mis pedidos, Ver detalles de mis pedidos, Realizar Pedido, Cancelar pedido, Generar facturas*/}
        <div className="main-buttons">
          <button className="button-VerPedidos" 
          onClick={handleVerPedidosClick}
          >
            Ver mis pedidos
          </button>
           
          <button
            className="button-VerDetallesPedidos"
            onClick={handleDetallesPedidosClick}
          >
            Ver detalles de mis pedidos
          </button>
          
          <button
            className="button-RealizarPedido"
            onClick={handleRealizarPedidoClick}
          >
            Realizar pedido
          </button>
          
          <button
            className="button-CancelarPedido"
            onClick={handleCancelarPedidoClick}
          >
            Cancelar pedido
          </button>
          
          <button
            className="button-GenerarFacturas"
            onClick={handleGenerarFacturasClick}
          >
            Generar facturas
          </button>
          
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Sumer Delivery - Todos los derechos reservados</p>
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

export default GestionPedidosComprador;

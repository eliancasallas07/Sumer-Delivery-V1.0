import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../estilos/Comprador/GeolocalizacionComprador.css";

const GeolocalizacionComprador = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  const handleCall = (type) => {
    let phoneNumber = "";

    // Asigna el número de teléfono según el tipo
    switch (type) {
      case "Repartidor":
        phoneNumber = "+1234567890"; // Número del repartidor
        break;
      case "Restaurante":
        phoneNumber = "+0987654321"; // Número del restaurante
        break;
      case "Soporte":
        phoneNumber = "+1112223333"; // Número de soporte
        break;
      default:
        phoneNumber = "+0000000000"; // Número por defecto
    }

    // Redirige a la llamada
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div>
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

      <main className="main geolocalizacion-main">
        <div className="left-panel">
          <button
            className="chat-button"
            onClick={() => handleCall("Repartidor")}
          >
            <img
              src={require("../../activos/icono-llamada.png")}
              alt="Llamar"
              className="icono-llamada"
            />{" "}
            Chat con Repartidor
          </button>
          <button
            className="chat-button"
            onClick={() => handleCall("Restaurante")}
          >
            <img
              src={require("../../activos/icono-llamada.png")}
              alt="Llamar"
              className="icono-llamada"
            />{" "}
            Chat con Restaurante
          </button>
          <button className="chat-button" onClick={() => handleCall("Soporte")}>
            <img
              src={require("../../activos/icono-llamada.png")}
              alt="Llamar"
              className="icono-llamada"
            />{" "}
            Chat con Soporte
          </button>
          <textarea
            className="observaciones"
            placeholder="Escribe tus observaciones..."
          ></textarea>
          <div className="calificacion">
            <label>Califica Restaurante (1 a 10):</label>
            <input
              type="number"
              min="1"
              max="10"
              className="calificacion-input"
            />
          </div>
          <div className="calificacion">
            <label>Califica Repartidor (1 a 10):</label>
            <input
              type="number"
              min="1"
              max="10"
              className="calificacion-input"
            />
          </div>
        </div>

        <div className="center-panel">
          <img
            src={require("../../activos/alternativa.png")}
            alt="Simulación de Mapa"
            className="mapa-estatico"
          />
        </div>

        <div className="right-panel">
          <div className="pin-container">
            <span className="pin-number" style={{ backgroundColor: "red" }}>
              1235
            </span>
            <span>PIN de Entrega</span>
          </div>
          <div className="confirmacion">
            <p>Confirmación de entrega en buenas condiciones (TyC)</p>
          </div>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleSliderChange}
              className="slider-input"
            />
            <div className="slider-track">
              <div
                className="slider-fill"
                style={{ width: `${sliderValue}%` }}
              ></div>
              <div
                className="slider-thumb"
                style={{ left: `${sliderValue}%` }}
              ></div>
            </div>
            <div className="slider-text">
              {sliderValue === 100
                ? "Deslizar para confirmar entrega"
                : "Desliza para confirmar"}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 Sumer Delivery - Todos los derechos reservados</p>
        <div className="social-links">{/* Links de redes sociales */}</div>
      </footer>
    </div>
  );
};

export default GeolocalizacionComprador;

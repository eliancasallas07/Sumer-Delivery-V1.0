import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../estilos/Repartidor/GeolocalizacionRecogida.css";
import "../../Global.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const GeolocalizacionRecogida = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [userPosition, setUserPosition] = useState([4.711, -74.0721]); // Coordenadas de Bogotá, Colombia
  const [pin, setPin] = useState(""); // Estado para el PIN
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      const geoWatcher = navigator.geolocation.watchPosition(
        (position) => {
          setUserPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error al obtener la geolocalización.", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      return () => navigator.geolocation.clearWatch(geoWatcher);
    } else {
      console.log("La geolocalización no está soportada por este navegador.");
    }
  }, []);

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setSliderValue(value);
    // Solo permite redirigir si el PIN no está vacío y el slider llega a 100
    if (pin.trim() !== "" && value === "100") {
      alert("Recogida confirmada. Redirigiendo a la entrega...");
      navigate("/GeolocalizacionEntrega");
    }
  };

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
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
          <h1>Sumer Delivery Usuario Repartidor</h1>
        </div>
        <div className="header-buttons">
          <button className="button-inicio" onClick={() => navigate("/InicioRepartidor")}>
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
      <h2>Geolocalizacion Recogida</h2>
        <table className="geolocalizacion-table">
          <tbody>
            <tr>
              <td className="left-panel">
                <button
                  className="chat-button"
                  onClick={() => navigate("/ChatComprador")}
                >
                  <img
                    src={require("../../activos/icono-llamada.png")}
                    alt="Llamar"
                    className="icono-llamada"
                  />{" "}
                  Chat con Comprador
                </button>

                <button
                  className="chat-button"
                  onClick={() => navigate("/ChatRestauranteRepartidor")}
                >
                  <img
                    src={require("../../activos/icono-llamada.png")}
                    alt="Llamar"
                    className="icono-llamada"
                  />{" "}
                  Chat con Restaurante
                </button>

                <button
                  className="chat-button"
                  onClick={() => navigate("/ChatSoporteRepartidor")}
                >
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
              </td>
              <td className="map-container">
                <MapContainer
                  center={userPosition} // Ubicación inicial en Bogotá
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={userPosition}>
                    <Popup>
                      <span>Ubicación actual: Bogotá, Colombia</span>
                    </Popup>
                  </Marker>
                </MapContainer>
              </td>
              <td className="right-panel">
                <div className="pin-container">
                  <label htmlFor="pin-recogida">Ingresar PIN de Recogida:</label>
                  <input
                    type="text"
                    id="pin-recogida"
                    name="pin-recogida"
                    placeholder="Ingresa el PIN"
                    className="pin-input"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    required
                  />
                </div>
                <div className="confirmacion">
                  <p>Confirmación de recogida en buenas condiciones (TyC)</p>
                </div>
                <div className="slider-container">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    className="slider-input"
                    disabled={pin.trim() === ""}
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
                    {sliderValue === "100"
                      ? "Deslizar para confirmar recogida"
                      : "Desliza para confirmar"}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </main>

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

export default GeolocalizacionRecogida;
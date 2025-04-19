import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../estilos/Comprador/GeolocalizacionComprador.css";
import '../../Global.css'; // Los estilos

// Importación de react-leaflet y estilos de Leaflet osea el mapa dentro de este usuario comprador 
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const GeolocalizacionComprador = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [userPosition, setUserPosition] = useState([4.711, -74.0721]); // Coordenadas de Bogotá, Colombia
  const navigate = useNavigate();

  // Obtener la ubicación del usuario en tiempo real
  useEffect(() => {
    if (navigator.geolocation) {
      // Usar watchPosition para obtener la ubicación en tiempo real
      const geoWatcher = navigator.geolocation.watchPosition(
        (position) => {
          // Actualizar la posición del usuario en tiempo real
          setUserPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error al obtener la geolocalización.", error);
        },
        {
          enableHighAccuracy: true, 
          timeout: 5000,            
          maximumAge: 0             
        }
      );

      // Limpiar el watcher cuando el componente se desmonte
      return () => navigator.geolocation.clearWatch(geoWatcher);
    } else {
      console.log("La geolocalización no está soportada por este navegador.");
    }
  }, []);

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  const handleCall = (type) => {
    let phoneNumber = "";

    switch (type) {
      case "Repartidor":
        phoneNumber = "+1234567890";
        break;
      case "Restaurante":
        phoneNumber = "+0987654321";
        break;
      case "Soporte":
        phoneNumber = "+1112223333";
        break;
      default:
        phoneNumber = "+0000000000";
    }

    window.location.href = `tel:${phoneNumber}`;
  };  
   
   // Logica para redirec  cion de los botones de chat con repartidor , restaurante y soporte
   
  const handleChatRedirect = (type) => {
    switch (type) {
      case "Repartidor":
        navigate("/chat-repartidor");
        break;
      case "Restaurante":
        navigate("/chat-restaurante");
        break;
      case "Soporte":
        navigate("/chat-soporte");
        break;
      default:
        break;
    }
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
        <table className="geolocalizacion-table">
          <tbody>
            <tr>
              <td className="left-panel">
                <button
                  className="chat-button"
                  onClick={() => navigate("/ChatRepartidor")}
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
                  onClick={() => navigate("/ChatRestaurante")}
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
                  onClick={() => navigate("/ChatSoporte")}
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
                <div className="calificacion">
                  <label>Califica Repartidor (1 a 10):</label>
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
              </td>
            </tr>
          </tbody>
        </table>
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

export default GeolocalizacionComprador;


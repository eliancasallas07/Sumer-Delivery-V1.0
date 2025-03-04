import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../../estilos/Administrador/AnalisisDatos.css"; // Los estilos

const AnalisisDatos = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  const [usuarioId, setUsuarioId] = useState("");
  const [documento, setDocumento] = useState("");

  const data = [
    {
      id: "1",
      pedidosRealizados: 120,
      frecuenciaUso: "Alta",
      horasPico: "14:00 - 16:00",
      productosMasComprados: "Pizza, Ensaladas",
      zonasFrecuentes: "Centro, Zona 1",
      rutasNavegacion: "Inicio -> Menú -> Pago",
      reseñas: "Muy buen servicio",
      calificacion: 4.5,
      feedback: "Recomendable",
    },
    
  ];

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
          <h1>Sumer Delivery Usuario Administrador</h1>
        </div>

        {/* Botones de inicio, regresar, cerrar sesión y switch */}
        <div className="header-buttons">
          <button className="button-inicio" onClick={() => navigate("/inicio")}>
            <img
              src={require("../../activos/boton-inicio.png")}
              alt="Inicio"
              className="button-icon-inicio"
            />
            Inicio
          </button>
          <button className="button-regresar" onClick={() => navigate(-1)}>
            <img
              src={require("../../activos/boton-regresar.png")}
              alt="Regresar"
              className="button-icon-regresar"
            />
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
            />
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
        <h2>Analisis de Datos</h2>

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
              <input type="radio" />
              Comprador
            </label>
            <label className="checkbox-label">
              <input type="radio" />
              Vendedor
            </label>
            <label className="checkbox-label">
              <input type="radio" />
              Repartidor
            </label>
          </div>

          <button className="botonConsulta">
            Consultar
          </button>
        </div>

        {/* Tabla de métricas */}
        <div className="table-container">
          <h3>Métricas de Uso</h3>
          <table className="metrics-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Métricas de Uso</th>
                <th>Comportamiento de Usuario</th>
                <th>Satisfacción del Cliente</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>

                  {/* Métricas de Uso */}
                  <td>
                    <p>Número de pedidos: {item.pedidosRealizados}</p>
                    <p>Frecuencia de uso: {item.frecuenciaUso}</p>
                    <p>Horas pico: {item.horasPico}</p>
                  </td>

                  {/* Comportamiento de Usuario */}
                  <td>
                    <p>Productos más comprados: {item.productosMasComprados}</p>
                    <p>Zonas de entrega más frecuentes: {item.zonasFrecuentes}</p>
                    <p>Rutas de navegación: {item.rutasNavegacion}</p>
                  </td>

                  {/* Satisfacción del Cliente */}
                  <td>
                    <p>Reseñas: {item.reseñas}</p>
                    <p>Calificación: {item.calificacion}</p>
                    <p>Feedback recibido: {item.feedback}</p>
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

export default AnalisisDatos;
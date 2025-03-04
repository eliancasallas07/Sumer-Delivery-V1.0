import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../../estilos/Comprador/FacturaComprador.css"; // Los estilos
import { jsPDF } from "jspdf"; // Importar jsPDF

const FacturaComprador = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  const handleGeolocalizacionComprador = () => {
    console.log("Redirigiendo a /GeolocalizacionComprador"); // Ver si el mensaje aparece en la consola
    navigate("/GeolocalizacionComprador");
  };

  // Datos de la factura (esto lo puedes ajustar según tu lógica)
  const factura = {
    numeroPedido: "12345",
    fecha: "2025-01-29",
    hora: "14:30",
    estado: "En Proceso",
    logoEstado: require("../../activos/logo-enproceso.png"),
    detalle: "Pedido de 2 productos",
    total: "$50,000",
    servicioDomicilio: "$3,000",
    km: "2",
    observaciones: "Incluir paquete extra.",
    nombreFactura: "Factura_2025-01-29",
  };

  // Función para descargar el PDF
  const handleDescargarFactura = () => {
    console.log("Generando y descargando factura en PDF...");

    // Crear una instancia de jsPDF
    const doc = new jsPDF();

    // Agregar el título
    doc.setFontSize(18);
    doc.text("Factura de Pedido", 20, 20);

    // Agregar los detalles de la factura
    doc.setFontSize(12);
    doc.text(`Número de Pedido: ${factura.numeroPedido}`, 20, 30);
    doc.text(`Fecha: ${factura.fecha}`, 20, 40);
    doc.text(`Hora: ${factura.hora}`, 20, 50);
    doc.text(`Estado: ${factura.estado}`, 20, 60);
    doc.text(`Detalle: ${factura.detalle}`, 20, 70);
    doc.text(`Total: ${factura.total}`, 20, 80);
    doc.text(
      `Valor de Servicio Domicilio: ${factura.servicioDomicilio}`,
      20,
      90
    );
    doc.text(`Kilómetros: ${factura.km}`, 20, 100);
    doc.text(`Observaciones: ${factura.observaciones}`, 20, 110);

    // Agregar el logo (logo de estado)
    doc.addImage(factura.logoEstado, "PNG", 150, 20, 40, 40); // Ajusta el tamaño y posición según sea necesario

    // Agregar el nombre de la factura con la fecha
    doc.text(`Nombre de Factura: ${factura.nombreFactura}`, 20, 120);

    // Descargar el PDF
    doc.save(`${factura.nombreFactura}.pdf`);
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
          <h1>Bienvenido a Sumer Delivery Usuario Comprador</h1>
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
        <h2>Factura y Confirmación de Pedido</h2>

        {/* Logo y mensaje fuera de la tabla */}
        <div className="ovni-message">
          <img
            src={require("../../activos/ovni.png")}
            alt="Logo OVNI"
            className="ovni-logo"
          />
          <div className="mensaje-burbuja">
            <h3>Hemos confirmado tu pedido Terrícola</h3>
          </div>
        </div>

        {/* Tabla de la factura */}
        <table className="tabla-factura">
          <thead>
            <tr>
              <th>Número de Pedido</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
              <th>Detalle</th>
              <th>Total</th>
              <th>Valor Servicio Domicilio</th>
              <th>Observaciones</th>
              <th>Factura</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{factura.numeroPedido}</td>
              <td>{factura.fecha}</td>
              <td>{factura.hora}</td>
              <td>
                <img
                  src={factura.logoEstado}
                  alt="Estado"
                  className="logo-estado"
                />
              </td>
              <td>{factura.detalle}</td>
              <td>{factura.total}</td>
              <td>
                {factura.servicioDomicilio} ({factura.km} km)
              </td>
              <td>{factura.observaciones}</td>
              <td>{factura.nombreFactura}</td>
            </tr>
          </tbody>
        </table>

        {/* Botón para descargar factura */}
        <button
          className="boton-descargar"
          onClick={handleDescargarFactura} // Llamar la función para descargar la factura
        >
          Descargar Factura
        </button>

        {/* Botón para redirigir a geolocalización */}
        <button
          className="boton-geolocalizacion"
          onClick={handleGeolocalizacionComprador} // Llamar la función para la redirección
        >
          Ir a Geolocalización
        </button>
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

export default FacturaComprador;

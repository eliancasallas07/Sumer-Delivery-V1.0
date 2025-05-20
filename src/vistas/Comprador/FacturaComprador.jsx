import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../estilos/Comprador/FacturaComprador.css";
import '../../Global.css';
import { jsPDF } from "jspdf";

const FacturaComprador = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [pedido, setPedido] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar datos del pedido desde localStorage
    const productos = JSON.parse(localStorage.getItem("cart") || "[]");
    const subtotal = localStorage.getItem("subtotal") || 0;
    const nombre = localStorage.getItem("nombre") || "";
    const apellidos = localStorage.getItem("apellidos") || "";
    const direccion = localStorage.getItem("direccion") || "";
    const ciudad = localStorage.getItem("ciudad") || "";
    const descripcion = localStorage.getItem("descripcion") || "";
    const telefono = localStorage.getItem("telefono") || "";
    const medio_pago = localStorage.getItem("medio_pago") || "";

    setPedido({
      productos,
      subtotal,
      nombre,
      apellidos,
      direccion,
      ciudad,
      descripcion,
      telefono,
      medio_pago,
      fecha: new Date().toISOString().slice(0, 10),
      hora: new Date().toLocaleTimeString('en-GB', { hour12: false }),
      estado: "En Proceso",
      logoEstado: require("../../activos/logo-enproceso.png"),
      numeroPedido: Math.floor(Math.random() * 100000), // Puedes mejorar esto con el ID real del backend
      servicioDomicilio: 3000,
      km: 2,
      observaciones: "",
      nombreFactura: `Factura_${new Date().toISOString().slice(0, 10)}`
    });
  }, []);

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  const handleGeolocalizacionComprador = () => {
    navigate("/GeolocalizacionComprador");
  };

  const handleDescargarFactura = () => {
    if (!pedido) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Factura de Pedido", 20, 20);
    doc.setFontSize(12);
    doc.text(`Número de Pedido: ${pedido.numeroPedido}`, 20, 30);
    doc.text(`Fecha: ${pedido.fecha}`, 20, 40);
    doc.text(`Hora: ${pedido.hora}`, 20, 50);
    doc.text(`Estado: ${pedido.estado}`, 20, 60);
    doc.text(`Nombre: ${pedido.nombre} ${pedido.apellidos}`, 20, 70);
    doc.text(`Dirección: ${pedido.direccion}, ${pedido.ciudad}`, 20, 80);
    doc.text(`Teléfono: ${pedido.telefono}`, 20, 90);
    doc.text(`Medio de Pago: ${pedido.medio_pago}`, 20, 100);
    doc.text(`Detalle:`, 20, 110);
    let y = 120;
    pedido.productos.forEach((prod, idx) => {
      doc.text(
        `- ${prod.name} (x${prod.quantity}) $${prod.price * prod.quantity}`,
        25,
        y
      );
      y += 10;
    });
    doc.text(`Subtotal: $${pedido.subtotal}`, 20, y);
    y += 10;
    doc.text(`Servicio Domicilio: $${pedido.servicioDomicilio}`, 20, y);
    y += 10;
    doc.text(`Total: $${Number(pedido.subtotal) + Number(pedido.servicioDomicilio)}`, 20, y);
    doc.save(`${pedido.nombreFactura}.pdf`);
  };

  if (!pedido) return null;

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
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Medio de Pago</th>
              <th>Detalle</th>
              <th>Subtotal</th>
              <th>Servicio Domicilio</th>
              <th>Total</th>
              <th>Factura</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{pedido.numeroPedido}</td>
              <td>{pedido.fecha}</td>
              <td>{pedido.hora}</td>
              <td>
                <img
                  src={pedido.logoEstado}
                  alt="Estado"
                  className="logo-estado"
                />
              </td>
              <td>{pedido.nombre} {pedido.apellidos}</td>
              <td>{pedido.direccion}, {pedido.ciudad}</td>
              <td>{pedido.telefono}</td>
              <td>{pedido.medio_pago}</td>
              <td>
                <ul>
                  {pedido.productos.map((prod, idx) => (
                    <li key={idx}>
                      {prod.name} (x{prod.quantity}) - ${prod.price * prod.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>${pedido.subtotal}</td>
              <td>${pedido.servicioDomicilio}</td>
              <td>${Number(pedido.subtotal) + Number(pedido.servicioDomicilio)}</td>
              <td>{pedido.nombreFactura}</td>
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

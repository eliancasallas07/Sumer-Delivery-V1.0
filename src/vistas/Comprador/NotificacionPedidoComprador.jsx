import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../../estilos/Comprador/NotificacionPedidoComprador.css"; // Los estilos
import '../../Global.css'; // Los estilos



const NotificacionPedidoComprador = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate(); // Inicializar useNavigate

  const [medioPago, setMedioPago] = useState(""); // Para manejar el medio de pago seleccionado

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  const handleMedioPagoChange = (e) => {
    const selectedMedioPago = e.target.value;
    setMedioPago(selectedMedioPago);

    // Redirigir automáticamente a PSE si se selecciona esa opción
    if (selectedMedioPago === "transaccion") {
      navigate("/pse");
    }
  };

  const handleFacturaCompradorClick = async (e) => {
    e.preventDefault();
    if (!medioPago) {
      alert("Por favor, selecciona un medio de pago antes de confirmar el pedido.");
      return;
    }

    // Recuperar productos y subtotal del carrito (ejemplo usando localStorage)
    const productos = JSON.parse(localStorage.getItem("cart") || "[]");
    const subtotal = localStorage.getItem("subtotal") || 0;

    // Obtener datos del formulario
    const form = e.target.form || e.target.closest("form");
    const nombre = form.nombre.value;
    const apellidos = form.apellidos.value;
    const direccion = form.direccion.value;
    const ciudad = form.ciudad.value;
    const descripcion = form.descripcion.value;
    const telefono = form.telefono.value;

    // Guardar datos en localStorage para la factura
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("apellidos", apellidos);
    localStorage.setItem("direccion", direccion);
    localStorage.setItem("ciudad", ciudad);
    localStorage.setItem("descripcion", descripcion);
    localStorage.setItem("telefono", telefono);
    localStorage.setItem("medio_pago", medioPago);

    // Enviar pedido al backend
    try {
      // Puedes agregar logs para depurar la respuesta del backend
      const response = await fetch("http://localhost:3000/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productos,
          subtotal,
          nombre,
          apellidos,
          direccion,
          ciudad,
          descripcion,
          telefono,
          medio_pago: medioPago,
        }),
      });
      const text = await response.text();
      let data = {};
      try {
        data = JSON.parse(text);
      } catch (e) {}
      console.error("Status HTTP:", response.status);
      console.error("Texto de respuesta:", text);

      if (!response.ok) {
        throw new Error(data.error || data.message || text || "Error al enviar el pedido");
      }
      navigate("/FacturaComprador");
    } catch (error) {
      alert("No se pudo enviar el pedido: " + error.message);
    }
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
          <button
            className="button-inicio"
            onClick={() => navigate("/InicioComprador")}
          >
            <img
              src={require("../../activos/boton-inicio.png")}
              alt="Inicio"
              className="button-icon-inicio"
            />
            {""}
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
        <h2>Notificación de Pedido</h2>

        {/* Formulario de Pedido */}
        <form>
          <table className="notificacion-pedido">
            <tbody>
              <tr className="form-row">
                <td className="form-title">Nombre:</td>
                <td className="form-input">
                  <input type="text" name="nombre" />
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Apellidos:</td>
                <td className="form-input">
                  <input type="text" name="apellidos" />
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Dirección:</td>
                <td className="form-input">
                  <input type="text" name="direccion" />
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Ciudad:</td>
                <td className="form-input">
                  <input type="text" name="ciudad" />
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Descripción del Pedido:</td>
                <td className="form-input">
                  <textarea name="descripcion" rows="4"></textarea>
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Teléfono:</td>
                <td className="form-input">
                  <input type="tel" name="telefono" />
                </td>
              </tr>
              <tr className="form-row">
                <td className="form-title">Medio de Pago:</td>
                <td className="form-input">
                  <select
                    name="medio_pago"
                    value={medioPago}
                    onChange={handleMedioPagoChange}
                  >
                    <option value="">Selecciona un medio de pago</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="transaccion">Transacción</option>
                  </select>
                </td>
              </tr>
              {medioPago === "transaccion" && (
                <tr className="form-row">
                  <td className="form-title">PSE:</td>
                  <td className="form-input">
                    <button type="button" onClick={() => navigate("/pse")}>
                      Ir a PSE
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <button
            type="submit"
            className="submit-btn-Confirmar"
            onClick={handleFacturaCompradorClick}
          >
            Confirmar Pedido
          </button>
        </form>

    
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

export default NotificacionPedidoComprador;

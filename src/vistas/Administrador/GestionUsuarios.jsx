import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../estilos/Administrador/GestionUsuarios.css";
import "../../Global.css";
import CryptoJS from "crypto-js";

const GestionUsuarios = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    nombres: "",
    apellidos: "",
    documento: "",
    fotoDocumento: null,
    direccion: "",
    ciudad: "",
    medioPago: "",
    calificacion: "",
    rol: "",
    telefono: "",
    tienda: "",
    documentosVehiculo: null,
    correo: "",
    usuario: "",
    contrasena: "",
  });

  const navigate = useNavigate();

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { rol } = formData;

    // Validar rol permitido
    if (!["comprador", "vendedor", "repartidor"].includes(rol)) {
      alert(
        "⚠️ Solo se permite registrar compradores, vendedores o repartidores."
      );
      return;
    }

    // Validar campos comunes
    const camposObligatorios = [
      "nombres",
      "apellidos",
      "telefono",
      "correo",
      "direccion",
      "ciudad",
      "usuario",
      "contrasena",
    ];

    for (let campo of camposObligatorios) {
      if (!formData[campo]) {
        alert(`⚠️ El campo "${campo}" es obligatorio.`);
        return;
      }
    }

    // Crear objeto base
    const hashedPassword = CryptoJS.SHA256(formData.contrasena).toString();

    const nuevoUsuario = {
      nombre: formData.nombres,
      apellidos: formData.apellidos,
      telefono: formData.telefono,
      correo_electronico: formData.correo,
      direccion: formData.direccion,
      ciudad_residencia: formData.ciudad,
      usuario: formData.usuario,
      contrasena: formData.contrasena,
    };

    if (rol === "comprador") {
      nuevoUsuario.calificacion = parseInt(formData.calificacion, 10);
      nuevoUsuario.medio_pago = formData.medioPago;
    } else if (rol === "vendedor") {
      if (!formData.tienda) {
        alert("⚠️ El nombre de la tienda es obligatorio.");
        return;
      }
      nuevoUsuario.nombre_tienda = formData.tienda;
      nuevoUsuario.calificacion = parseInt(formData.calificacion, 10);
      nuevoUsuario.medio_pago = formData.medioPago;
    } else if (rol === "repartidor") {
      if (!formData.documentosVehiculo) {
        alert("⚠️ Los documentos del vehículo son obligatorios.");
        return;
      }
      nuevoUsuario.documentos_vehiculo = formData.documentosVehiculo;
    }

    const endpoint = `http://localhost:3001/api/${
      rol === "vendedor" ? "vendedores" : rol + "s"
    }`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      });

      const text = await response.text();
      console.log("📦 Respuesta cruda del servidor:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error("❌ Error al convertir JSON:", error);
        alert("⚠️ Respuesta inválida del servidor");
        return;
      }

      if (response.ok) {
        alert(`✅ ${rol} registrado con éxito`);
        console.log("🔄 Respuesta del servidor:", data);
      } else {
        // Mostrar un mensaje de error más descriptivo al usuario
        let errorMessage = `❌ Error al registrar ${rol}: `;
        if (data && data.error) {
          errorMessage += data.error; // Usa el mensaje de error del servidor
        } else {
          errorMessage +=
            "Error desconocido, verifique la consola para más detalles.";
        }
        alert(errorMessage);
        console.error("❌ Detalle del error:", data);
      }
    } catch (error) {
      console.error("🚫 Error al conectar con el servidor:", error);
      alert("🚫 No se pudo conectar con el servidor");
    }
  };

  // Funciones para manejar la navegación de los botones
  const handleEditarUsuariosClick = () => {
    console.log("Redirigiendo a /editar-usuarios");
    navigate("/editar-usuarios");
  };

  const handleEstadoUsuariosClick = () => {
    console.log("Redirigiendo a /estado-usuarios");
    navigate("/estado-usuarios");
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
          <h1>Sumer Delivery Usuario Administrador</h1>
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
        <h2>Crear un Nuevo Usuario</h2>

        {/* Nuevos botones: Editar y Estado dentro de main */}
        <div className="extra-buttons">
          <button
            className="button-editar"
            onClick={handleEditarUsuariosClick} // Asignamos la función de navegación aquí
          >
            Editar
          </button>
          <button
            className="button-estado"
            onClick={handleEstadoUsuariosClick} // Asignamos la función de navegación aquí
          >
            Estado
          </button>
        </div>

        <form onSubmit={handleSubmit} className="user-form">
          <table className="form-table">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="id">ID:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="nombres">Nombres:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="nombres"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="apellidos">Apellidos:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="documento">Documento (C.C):</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="documento"
                    name="documento"
                    value={formData.documento}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="fotoDocumento">
                    Foto de Documento (PDF):
                  </label>
                </td>
                <td>
                  <input
                    type="file"
                    id="fotoDocumento"
                    name="fotoDocumento"
                    onChange={handleFileChange}
                    accept=".pdf"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="direccion">Dirección de Residencia:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="ciudad">Ciudad de Residencia:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="medioPago">Medio de Pago:</label>
                </td>
                <td>
                  <select
                    id="medioPago"
                    name="medioPago"
                    value={formData.medioPago}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccione un medio de pago</option>
                    <option value="paypal">Paypal</option>
                    <option value="pse">PSE</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="calificacion">Calificación (1-10):</label>
                </td>
                <td>
                  <input
                    type="number"
                    id="calificacion"
                    name="calificacion"
                    value={formData.calificacion}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="rol">Rol:</label>
                </td>
                <td>
                  <select
                    id="rol"
                    name="rol"
                    value={formData.rol}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccione un rol</option>
                    <option value="comprador">Comprador</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="repartidor">Repartidor</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="telefono">Teléfono:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="tienda">
                    Nombre de la Tienda (si aplica):
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    id="tienda"
                    name="tienda"
                    value={formData.tienda}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="documentosVehiculo">
                    Documentos del Vehículo (PDF, si aplica):
                  </label>
                </td>
                <td>
                  <input
                    type="file"
                    id="documentosVehiculo"
                    name="documentosVehiculo"
                    onChange={handleFileChange}
                    accept=".pdf"
                  />
                </td>
              </tr>

              {/* CORREO Y NOMBRE DE USUARIO EN FILAS SEPARADAS */}
              <tr>
                <td>
                  <label htmlFor="correo">Correo Electrónico:</label>
                </td>
                <td>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="usuario">Nombre de Usuario:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="contrasena">Contraseña:</label>
                </td>
                <td>
                  <input
                    type="password"
                    id="contrasena"
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Botones de Aplicar Cambios y Cancelar */}
          <div className="form-actions">
            <label>
              <input type="checkbox" /> Acepto los términos y condiciones
            </label>
            <div className="action-buttons">
              <button type="submit" className="apply-btn">
                Aplicar Cambios
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/inicio")}
              >
                Cancelar
              </button>
            </div>
          </div>
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

export default GestionUsuarios;

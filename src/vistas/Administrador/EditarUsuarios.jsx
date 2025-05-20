import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Necesitamos este hook para la navegación
import "../../estilos/Administrador/EditarUsuarios.css"; // Los estilos
import '../../Global.css'; // Los estilos

const EditarUsuarios = () => {
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
  });

  const navigate = useNavigate(); // Definir el hook navigate

  // Función para cambiar el estado de conexión
  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para manejar cambios en los campos de archivo
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado", formData);
  };

  // Funciones para navegar a otras páginas
  const handleEditarUsuariosClick = () => {
    navigate("/editar-usuarios"); // Redirige a la página de editar usuarios
  };

  const handleEstadoUsuariosClick = () => {
    navigate("/estado-usuarios"); // Redirige a la página de estado de usuarios
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

        {/* Botones de navegación */}
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
        <h2>Editar un Usuario</h2>

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
                <td><label htmlFor="id">ID:</label></td>
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
                <td><label htmlFor="nombres">Nombres:</label></td>
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
                <td><label htmlFor="apellidos">Apellidos:</label></td>
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
                <td><label htmlFor="documento">Documento (C.C):</label></td>
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
                <td><label htmlFor="fotoDocumento">Foto de Documento (PDF):</label></td>
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
                <td><label htmlFor="direccion">Dirección de Residencia:</label></td>
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
                <td><label htmlFor="ciudad">Ciudad de Residencia:</label></td>
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
                <td><label htmlFor="medioPago">Medio de Pago:</label></td>
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
                <td><label htmlFor="calificacion">Calificación (1-10):</label></td>
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
                <td><label htmlFor="rol">Rol:</label></td>
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
                <td><label htmlFor="telefono">Teléfono:</label></td>
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
                <td><label htmlFor="tienda">Nombre de la Tienda (si aplica):</label></td>
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
                <td><label htmlFor="documentosVehiculo">Documentos del Vehículo (PDF, si aplica):</label></td>
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
              <tr>
                <td><label htmlFor="correo">Correo Electrónico:</label></td>
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
            </tbody>
          </table>

          {/* Botones de Aplicar Cambios y Cancelar */}
          <div className="form-actions">
            <label>
              <input type="checkbox" required /> Acepto los términos y
              condiciones
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

export default EditarUsuarios;
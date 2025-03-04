import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../../estilos/Administrador/GestionTiendas.css"; // Los estilos

const GestionTiendas = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [usuarioId, setUsuarioId] = useState("");
  const [documento, setDocumento] = useState("");
  const [usuarioTipo, setUsuarioTipo] = useState("");
  const [loading, setLoading] = useState(false);
  const [formularioVisible, setFormularioVisible] = useState(null); // Cambié el estado a null para manejar ambos formularios
  const [datosPedidos, setDatosPedidos] = useState([]);
  const [datosInventario, setDatosInventario] = useState([]);
  const [datosCompradores, setDatosCompradores] = useState([]);
  const [datosHorario, setDatosHorario] = useState([]);

  const navigate = useNavigate(); // Inicializar useNavigate

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  const handleConsultar = () => {
    setLoading(true);
    // Simulación de datos para las tablas
    setTimeout(() => {
      setLoading(false);
      setDatosPedidos([
        {
          id: 1,
          accion: "Seguimiento de pedidos",
          detalles: "Verificar estado de pedidos",
        },
      ]);
      setDatosInventario([
        {
          id: 2,
          accion: "Actualizar Productos",
          detalles: "Actualizar precios y stock",
        },
      ]);
      setDatosCompradores([
        {
          id: 1,
          accion: "Base de datos completa",
          detalles: "Información de compradores y ventas",
        },
      ]);
      setDatosHorario([
        { id: 1, fecha: "2025-01-21", horas: "8:00 AM - 5:00 PM" },
      ]);
    }, 1000);
  };

  const handleMostrarFormulario = (tipoFormulario) => {
    setFormularioVisible(tipoFormulario); // Mostrar el formulario según el tipo
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
        <h2>Gestión de Tiendas</h2>

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

          {/* Sección de tipo de usuario */}
          <div className="checkbox-container">
            <label className="checkbox-label">
              <input
                type="radio"
                name="usuarioTipo"
                onChange={() => setUsuarioTipo("Vendedor")}
                checked={usuarioTipo === "Vendedor"}
              />{" "}
              Vendedor
            </label>
          </div>

          <button className="botonConsulta" onClick={handleConsultar}>
            Consultar
          </button>
        </div>

        {/* Tabla de Gestión de Pedidos */}
        <h3>Gestión de Pedidos</h3>
        <table className="tabla-seguridad">
          <thead>
            <tr>
              <th>ID</th>
              <th>Acción</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {datosPedidos.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>
                  <button
                    className="botonAccion" // Clase para los botones de acción
                    onClick={() => handleMostrarFormulario("seguimiento")}
                  >
                    {dato.accion}
                  </button>
                </td>
                <td>{dato.detalles}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Formulario de Seguimiento de Pedido */}
        {formularioVisible === "seguimiento" && (
          <div className="form-container">
            <h3>Formulario de Seguimiento de Pedido</h3>
            <label>ID del Pedido:</label>
            <input type="text" value="PED-001" readOnly />

            <label>Fecha y Hora del Pedido:</label>
            <input type="text" value="2025-01-20 14:30" readOnly />

            <label>Nombre del Comprador:</label>
            <input type="text" value="Juan Pérez" readOnly />

            <label>Estado del Pedido:</label>
            <select>
              <option value="Pendiente">Pendiente</option>
              <option value="En preparación">En preparación</option>
              <option value="En tránsito">En tránsito</option>
              <option value="Entregado">Entregado</option>
              <option value="Cancelado">Cancelado</option>
            </select>

            <label>Producto(s) del Pedido:</label>
            <textarea
              value="Pizza Margarita x 1, Coca-Cola 500ml x 2"
              readOnly
            />

            <label>Precio Total del Pedido:</label>
            <input type="text" value="$34.99" readOnly />

            <label>Método de Pago:</label>
            <input type="text" value="Tarjeta de Crédito" readOnly />

            <label>Fecha Estimada de Entrega:</label>
            <input type="date" value="2025-01-21" readOnly />

            <label>Ubicación de Entrega:</label>
            <input type="text" value="Calle Ficticia 123, Ciudad" readOnly />

            <label>Detalles del Envío:</label>
            <input type="text" value="Repartidor: Pedro García" readOnly />

            <label>Notas Adicionales:</label>
            <textarea placeholder="Notas adicionales" />

            <button className="botonConsulta">
              Actualizar Estado del Pedido
            </button>
          </div>
        )}

        {/* Tabla de Gestión de Inventario */}
        <h3>Gestión de Inventario</h3>
        <table className="tabla-seguridad">
          <thead>
            <tr>
              <th>ID</th>
              <th>Acción</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {datosInventario.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>
                  <button
                    className="botonAccion" // Clase para los botones de acción
                    onClick={() => handleMostrarFormulario("actualizar")}
                  >
                    {dato.accion}
                  </button>
                </td>
                <td>{dato.detalles}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Formulario de Actualización de Producto */}
        {formularioVisible === "actualizar" && (
          <div className="form-container">
            <h3>Formulario de Actualización de Producto</h3>
            <label>ID del Producto:</label>
            <input type="text" value="PIZ-001" readOnly />

            <label>Nombre del Producto:</label>
            <input type="text" value="Pizza Margarita" />

            <label>Descripción del Producto:</label>
            <textarea value="Pizza con tomate, queso, albahaca" />

            <label>Categoría del Producto:</label>
            <select>
              <option value="Comidas rápidas">Comidas rápidas</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Postres">Postres</option>
              <option value="Drogueria">Drogeria</option>
              <option value="Snacks y Aperitivos">Snacks y Aperitivos</option>
              <option value="Comida Saludable">Comida Saludable</option>
              <option value="Comida Internacional">Comida Internacional</option>
            </select>

            <label>Precio Actualizado:</label>
            <input type="number" value="15.99" />

            <label>Cantidad en Stock:</label>
            <input type="number" value="100" />

            <label>Imagen del Producto:</label>
            <input type="file" />

            <label>Estado del Producto:</label>
            <select>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Descontinuado">Descontinuado</option>
            </select>

            <label>Fecha de Disponibilidad:</label>
            <input type="date" value="2025-02-01" />

            <label>SKU (Stock Keeping Unit):</label>
            <input type="text" value="PIZ-001" />

            <button className="botonConsulta">Actualizar Producto</button>
          </div>
        )}
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

export default GestionTiendas;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import '../../estilos/Comprador/CancelarPedido.css'; // Los estilos

const CancelarPedido = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [sliderValue, setSliderValue] = useState(0); // Estado para el deslizador
  const [motivo, setMotivo] = useState(""); // Estado para el motivo
  const [aceptaTerminos, setAceptaTerminos] = useState(false); // Estado para el checkbox de términos
  const [confirmarCancelacion, setConfirmarCancelacion] = useState(false); // Estado para el checkbox de cancelación
  const navigate = useNavigate();  // Inicializar useNavigate

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const handleCancelarPedido = () => {
    if (!aceptaTerminos || !confirmarCancelacion) {
      alert("Debes aceptar los términos y confirmar la cancelación.");
      return;
    }
    if (sliderValue !== 100) {
      alert("Debes deslizar completamente para confirmar la cancelación.");
      return;
    }
    alert(`Pedido cancelado por el siguiente motivo: ${motivo}`);
  };

  const pedidos = [
    {
      numero: "001",
      fecha: "2023-10-01",
      hora: "10:30 AM",
      estado: "Entregado",
      detalle: "Pizza grande, 2 bebidas",
      total: "$50,000",
      servicioKm: "$5,000",
      observaciones: "Entregado a tiempo",
    },
    {
      numero: "002",
      fecha: "2023-10-02",
      hora: "12:00 PM",
      estado: "En camino",
      detalle: "Hamburguesa, papas fritas",
      total: "$30,000",
      servicioKm: "$3,000",
      observaciones: "Requiere cambio de billete",
    },
    {
      numero: "003",
      fecha: "2023-10-03",
      hora: "08:45 PM",
      estado: "Cancelado",
      detalle: "Sushi combo",
      total: "$40,000",
      servicioKm: "$4,000",
      observaciones: "Cancelado por el cliente",
    },
  ];

  return (
    <div>
      {/* Header */}
      <header className="home-header">
        <div className="home-header-logo">
          <img src={require('../../activos/Logotipo.png')} alt="Logo Sumer" className="header-logo" />
        </div>
        <div className="home-header-left">
          <h1>Sumer Delivery Usuario Comprador</h1>
        </div>

           {/* Botones de inicio, regresar, cerrar sesión y switch */}
           <div className="header-buttons">
          <button className="button-inicio" onClick={() => navigate('/InicioComprador')}>
            <img src={require('../../activos/boton-inicio.png')} alt="Inicio" className="button-icon-inicio" /> Inicio
          </button>
          <button className="button-regresar" onClick={() => navigate(-1)}>
            <img src={require('../../activos/boton-regresar.png')} alt="Regresar" className="button-icon-regresar" /> Regresar
          </button>
          <button className="button-cerrarsesion" onClick={() => navigate('/login')}>
            <img src={require('../../activos/boton-cerrarsesion.png')} alt="Cerrar sesión" className="button-icon-cerrarsesion" /> Cerrar sesión
          </button>

          {/* Interruptor de conexión */}
          <div className="connection-status">
            <div className="switch-container" onClick={handleSwitchToggle}>
              <div className={`switch ${isConnected ? 'active' : ''}`}></div>
            </div>
            <span className={`status-text ${isConnected ? 'connected' : 'disconnected'}`}>
              {isConnected ? 'Conectado' : 'Desconectado'}
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        <h2>Cancelar Pedido</h2>
        <div className="table-container">
          <table className="pedido-table">
            <thead>
              <tr>
                <th>Número de Pedido</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Detalle de Pedido</th>
                <th>Total</th>
                <th>Valor de Servicio (Km)</th>
                <th>Observaciones</th>
                <th>Factura</th>
                <th>Motivo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido, index) => (
                <tr key={index}>
                  <td data-label="Número de Pedido">{pedido.numero}</td>
                  <td data-label="Fecha">{pedido.fecha}</td>
                  <td data-label="Hora">{pedido.hora}</td>
                  <td data-label="Estado">{pedido.estado}</td>
                  <td data-label="Detalle de Pedido">{pedido.detalle}</td>
                  <td data-label="Total">{pedido.total}</td>
                  <td data-label="Valor de Servicio (Km)">{pedido.servicioKm}</td>
                  <td data-label="Observaciones">{pedido.observaciones}</td>
                  <td data-label="Factura">
                    <button
                      className="download-button"
                      onClick={() => alert(`Descargando factura del pedido ${pedido.numero}`)}
                    >
                      Descargar
                    </button>
                  </td>
                  <td data-label="Motivo">
                    <textarea
                      placeholder="Escribe el motivo de la cancelación..."
                      value={motivo}
                      onChange={(e) => setMotivo(e.target.value)}
                      className="motivo-textarea"
                    ></textarea>
                  </td>
                  <td data-label="Acciones">
                    <div className="checkbox-container">
                      <label>
                        <input
                          type="checkbox"
                          checked={confirmarCancelacion}
                          onChange={(e) => setConfirmarCancelacion(e.target.checked)}
                        />
                        Confirmar Cancelación
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={aceptaTerminos}
                          onChange={(e) => setAceptaTerminos(e.target.checked)}
                        />
                        Aceptar Términos y Condiciones
                      </label>
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
                          ? "Deslizar para confirmar cancelación"
                          : "Desliza para confirmar"}
                      </div>
                    </div>
                    <button
                      className="cancel-button"
                      onClick={handleCancelarPedido}
                    >
                      Cancelar Pedido
                    </button>
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
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={require('../../activos/instagram.png')} alt="Logo Instagram" className="instagram" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={require('../../activos/facebook.png')} alt="Logo Facebook" className="facebook" />
          </a>
          <a href="mailto:tu_correo@ejemplo.com" target="_blank" rel="noopener noreferrer">
            <img src={require('../../activos/correoelectronico.png')} alt="Logo Correo Electrónico" className="correoelectronico" />
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
            <img src={require('../../activos/tiktok.png')} alt="Logo TikTok" className="tiktok" />
          </a>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
            <img src={require('../../activos/whatsapp.png')} alt="Logo WhatsApp" className="whatsapp" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default CancelarPedido ;
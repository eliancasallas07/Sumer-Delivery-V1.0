import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import '../../estilos/Repartidor/GestionVehiculos.css'; // Los estilos
import '../../Global.css'; // Los estilos

const GestionVehiculos = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();  // Inicializar useNavigate

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div>
      {/* Header */}
      <header className="home-header">
        <div className="home-header-logo">
          <img src={require('../../activos/Logotipo.png')} alt="Logo Sumer" className="header-logo" />
        </div>
        <div className="home-header-left">
          <h1>Sumer Delivery Usuario Repartidor</h1>
        </div>

           {/* Botones de inicio, regresar, cerrar sesión y switch */}
           <div className="header-buttons">
          <button className="button-inicio" onClick={() => navigate('/InicioRepartidor')}>
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
        <h2>Gestión de Vehículos</h2>
        <div className="table-container">
          <table className="vehiculos-table">
            <thead>
              <tr>
                <th>Marca de Vehículo</th>
                <th>Tipo de Vehículo</th>
                <th>Placas de Vehículo</th>
                <th>Modelo</th>
                <th>Documentos PDF del Vehículo</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  marca: "Yamaha",
                  tipo: "Motocicleta",
                  placas: "ABC123",
                  modelo: "2020",
                  documentos: null,
                },
                {
                  marca: "Honda",
                  tipo: "Motocicleta",
                  placas: "XYZ789",
                  modelo: "2019",
                  documentos: null,
                },
                {
                  marca: "Suzuki",
                  tipo: "Motocicleta",
                  placas: "LMN456",
                  modelo: "2021",
                  documentos: null,
                },
              ].map((vehiculo, index) => (
                <tr key={index}>
                  <td data-label="Marca de Vehículo">{vehiculo.marca}</td>
                  <td data-label="Tipo de Vehículo">{vehiculo.tipo}</td>
                  <td data-label="Placas de Vehículo">{vehiculo.placas}</td>
                  <td data-label="Modelo">{vehiculo.modelo}</td>
                  <td data-label="Documentos PDF del Vehículo">
                    <input type="file" accept=".pdf" />
                  </td>
                  <td data-label="Acción">
                    <button
                      className="cargar-documentos-btn"
                      onClick={() =>
                        alert(
                          "Documentos cargados. En 48 horas o menos se confirmarán los documentos."
                        )
                      }
                    >
                      Cargar Documentos
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

export default GestionVehiculos;
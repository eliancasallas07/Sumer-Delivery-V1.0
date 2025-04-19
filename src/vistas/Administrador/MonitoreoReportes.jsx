import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../../estilos/Administrador/MonitoreoReportes.css'; // Los estilos
import '../../Global.css'; // Los estilos

const MonitoreoReportes = () => {
  const [usuarioId, setUsuarioId] = useState('');
  const [documento, setDocumento] = useState('');
  const [rol, setRol] = useState('');
  const [datosReporte, setDatosReporte] = useState(null);
  const navigate = useNavigate();  // Hook de navegación

  // Manejo del formulario de búsqueda
  const handleConsulta = () => {
    // Lógica para determinar qué datos mostrar dependiendo del rol
    if (rol === 'Comprador') {
      setDatosReporte({
        titulo: 'Comprador',
        actividad: 'Intentos de acceso fallidos: 3 intentos',
        pedidos: 'Pedidos realizados: 45',
        completados: 'Pedidos completados: 42',
        cancelados: 'Pedidos cancelados: 3',
        venta: 'Ventas totales: $0',
        inventario: 'N/A',
        ingresos: 'Total $: $1,200',
        usuario: 'Juan Pérez',
        idUsuario: '12345',
        documento: '987654321',
        tienda: 'N/A',
      });
    } else if (rol === 'Vendedor') {
      setDatosReporte({
        titulo: 'Vendedor',
        actividad: 'Intentos de acceso fallidos: 1 intento',
        pedidos: 'Pedidos recibidos: 110',
        completados: 'Pedidos completados: 105',
        cancelados: 'Pedidos cancelados: 5',
        venta: 'Ventas totales: $3,500',
        categoria: 'Categoría más vendida: Comida rápida',
        inventario: 'Niveles de inventario: 150 productos',
        agotados: 'Productos agotados: 12',
        ingresos: 'Total $: $3,200',
        usuario: 'Ana Martínez',
        idUsuario: '87654',
        documento: '123987654',
        tienda: 'Asadero 24horas',
      });
    } else if (rol === 'Repartidor') {
      setDatosReporte({
        titulo: 'Repartidor',
        actividad: 'Intentos de acceso fallidos: 0 intentos',
        pedidos: 'Pedidos asignados: 120',
        entregados: 'Pedidos entregados: 115',
        cancelados: 'Pedidos cancelados: 5',
        venta: 'Ventas totales: $0',
        inventario: 'N/A',
        ingresos: 'Total $: $850',
        usuario: 'Carlos Gómez',
        idUsuario: '43210',
        documento: '112233445',
        tienda: 'Asadero 24horas',
      });
    }
  };

  // Función para manejar la descarga del archivo comprimido
  const handleDownload = () => {
    // Aquí tengo que conectar con el backend para generar el archivo comprimido
    

    const link = document.createElement('a');
    link.href = '/ruta/al/archivo/monitoreo-reportes.zip'; // Ruta al archivo comprimido
    link.download = 'monitoreo-reportes.zip';
    link.click();
  };

  return (
    <div>
      {/* Header */}
      <header className="home-header">
        <div className="home-header-logo">
          <img src={require('../../activos/Logotipo.png')} alt="Logo Sumer" className="header-logo" />
        </div>
        <div className="home-header-left">
          <h1>Sumer Delivery Usuario Administrador</h1>
        </div>

        {/* Botones de inicio, regresar, cerrar sesión */}
        <div className="header-buttons">
          <button className="button-inicio" onClick={() => navigate('/inicio')}>
            <img src={require('../../activos/boton-inicio.png')} alt="Inicio" className="button-icon-inicio" /> Inicio
          </button>
          <button className="button-regresar" onClick={() => navigate(-1)}>
            <img src={require('../../activos/boton-regresar.png')} alt="Regresar" className="button-icon-regresar" /> Regresar
          </button>
          <button className="button-cerrarsesion" onClick={() => navigate('/login')}>
            <img src={require('../../activos/boton-cerrarsesion.png')} alt="Cerrar sesión" className="button-icon-cerrarsesion" /> Cerrar sesión
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        <h2>Monitoreo y Reportes</h2>

        {/* Formulario para ingresar datos en tabla */}
        <table className="form-table">
          <tbody>
            <tr>
              <td><label>ID Usuario:</label></td>
              <td>
                <input
                  type="text"
                  value={usuarioId}
                  onChange={(e) => setUsuarioId(e.target.value)}
                  placeholder="Ingrese el ID del usuario"
                />
              </td>
            </tr>
            <tr>
              <td><label>Documento:</label></td>
              <td>
                <input
                  type="text"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  placeholder="Ingrese el documento"
                />
              </td>
            </tr>
            <tr>
              <td><label>Rol:</label></td>
              <td>
                <div className="checkbox-container">
                  <label className="checkbox-label">
                    <input type="radio" name="rol" onChange={() => setRol('Comprador')} /> Comprador
                  </label>
                  <label className="checkbox-label">
                    <input type="radio" name="rol" onChange={() => setRol('Vendedor')} /> Vendedor
                  </label>
                  <label className="checkbox-label">
                    <input type="radio" name="rol" onChange={() => setRol('Repartidor')} /> Repartidor
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <button className="botonConsulta" onClick={handleConsulta}>
                  Consultar
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Mostrar la tabla según el tipo de rol */}
        {datosReporte && (
          <div className="report-container">
            <h3>{datosReporte.titulo}</h3>
            <table className="report-table">
              <tbody>
                <tr>
                  <th>Informe de Actividades de Usuario</th>
                  <td>{datosReporte.actividad}</td>
                </tr>
                <tr>
                  <th>Informe de Pedidos</th>
                  <td>{datosReporte.pedidos}</td>
                </tr>
                {datosReporte.completados && (
                  <tr>
                    <th>Pedidos Completados</th>
                    <td>{datosReporte.completados}</td>
                  </tr>
                )}
                {datosReporte.cancelados && (
                  <tr>
                    <th>Pedidos Cancelados</th>
                    <td>{datosReporte.cancelados}</td>
                  </tr>
                )}
                <tr>
                  <th>Informe de Venta</th>
                  <td>{datosReporte.venta}</td>
                </tr>
                {datosReporte.categoria && (
                  <tr>
                    <th>Categoría más vendida</th>
                    <td>{datosReporte.categoria}</td>
                  </tr>
                )}
                {datosReporte.inventario && (
                  <tr>
                    <th>Informe de Inventario</th>
                    <td>{datosReporte.inventario}</td>
                  </tr>
                )}
                <tr>
                  <th>Ingresos Totales</th>
                  <td>{datosReporte.ingresos}</td>
                </tr>
                <tr>
                  <th>Nombre y ID de Usuario</th>
                  <td>{datosReporte.usuario} (ID: {datosReporte.idUsuario})</td>
                </tr>
                <tr>
                  <th>Documento</th>
                  <td>{datosReporte.documento}</td>
                </tr>
                <tr>
                  <th>Tienda</th>
                  <td>{datosReporte.tienda}</td>
                </tr>
              </tbody>
            </table>

            {/* Botón para descargar archivo comprimido */}
            <div className="download-container" style={{ textAlign: "center" }}>
              <button className="download-button" onClick={handleDownload}>
                Descargar Reporte Comprimido
              </button>
            </div>
          </div>
        )}
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

export default MonitoreoReportes;
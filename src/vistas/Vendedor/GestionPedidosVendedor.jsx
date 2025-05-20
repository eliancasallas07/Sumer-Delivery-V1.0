import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../estilos/Vendedor/GestionPedidosVendedor.css';


const GestionPedidosVendedor = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

  // Obtener pedidos del backend al cargar la página
  useEffect(() => {
    const fetchPedidos = () => {
      fetch("http://localhost:3001/api/pedidos")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            // Asegura que cada pedido tenga apellidos y ciudad aunque sean vacíos
            const pedidosConCampos = data.map(p => ({
              ...p,
              // Elimina apellidos y ciudad
            }));
            setPedidos(pedidosConCampos);
          } else {
            setPedidos([]);
          }
        })
        .catch(() => setPedidos([]));
    };
    fetchPedidos();
    // Opcional: actualiza cada 10 segundos para ver cambios en tiempo real
    const interval = setInterval(fetchPedidos, 10000);
    return () => clearInterval(interval);
  }, []);

  // Cambiar estado del pedido (ejemplo: confirmar)
  const confirmarPedido = async (pedidoId) => {
    const pedidoConfirmado = pedidos.find(p => p.id === pedidoId);
    if (!pedidoConfirmado) {
      alert("No se encontró el pedido para confirmar.");
      return;
    }
    // Quita el disabled del botón para pruebas y agrega logs para depuración
    console.log("Intentando confirmar pedido:", pedidoId, pedidoConfirmado);
    if (window.confirm("¿Quieres confirmar este pedido?")) {
      try {
        const res = await fetch(`http://localhost:3001/api/pedidos/${pedidoId}/confirmar`, {
          method: "PUT"
        });
        if (res.ok) {
          localStorage.setItem("pedidoConfirmado", JSON.stringify(pedidoConfirmado));
          console.log("Pedido confirmado y guardado en localStorage, navegando...");
          navigate("/NotificacionPedidoVendedor");
        } else {
          const errorText = await res.text();
          alert("Error al confirmar el pedido: " + errorText);
        }
      } catch (e) {
        alert("Error al confirmar el pedido");
      }
    }
  };

  // Eliminar pedido del backend y actualizar la lista después de borrar
  const eliminarPedido = async (pedidoId) => {
    if (window.confirm("¿Seguro que deseas cancelar este pedido?")) {
      try {
        const res = await fetch(`http://localhost:3001/api/pedidos/${pedidoId}`, {
          method: "DELETE",
        });
        if (res.ok) {
          // Espera a que el backend realmente lo borre y luego actualiza la lista desde el backend
          const nuevosPedidos = await fetch("http://localhost:3001/api/pedidos").then(r => r.json());
          setPedidos(Array.isArray(nuevosPedidos) ? nuevosPedidos : []);
        } else {
          alert("Error al cancelar el pedido");
        }
      } catch {
        alert("Error al cancelar el pedido");
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="home-header">
        <div className="home-header-logo">
          <img src={require('../../activos/Logotipo.png')} alt="Logo Sumer" className="header-logo" />
        </div>
        <div className="home-header-left">
          <h1>Sumer Delivery Usuario Vendedor</h1>
        </div>

           {/* Botones de inicio, regresar, cerrar sesión y switch */}
           <div className="header-buttons">
          <button className="button-inicio" onClick={() => navigate('/InicioVendedor')}>
            <img src={require('../../activos/boton-inicio.png')} alt="Inicio" className="button-icon-inicio" /> Inicio
          </button>
          <button className="button-regresar" onClick={() => navigate(-1)}>
            <img src={require('../../activos/boton-regresar.png')} alt="Regresar" className="button-icon-regresar" /> Regresar
          </button>
          <button className="button-cerrarsesion" onClick={() => navigate('/Login')}>
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
        <h2>Gestión de pedidos</h2>
        <div className="gestion-pedidos">
          <table className="pedido-table">
            <thead>
              <tr>
                <th>Confirmar / Cancelar</th>
                <th>Número de Pedido (ID)</th>
                <th>Fecha</th>
                <th>Número de Repartidor (ID)</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Detalle de Producto</th>
                <th>Nombre</th>
                {/* Quitar <th>Apellidos</th> */}
                <th>Dirección</th>
                {/* Quitar <th>Ciudad</th> */}
                <th>Teléfono</th>
                <th>Medio de Pago</th>
                <th>Subtotal</th>
                <th>Servicio a Domicilio</th>
                <th>Total</th>
                <th>Factura</th>
                {/* Elimina la columna Acciones */}
              </tr>
            </thead>
            <tbody>
              {pedidos.length === 0 ? (
                <tr>
                  <td colSpan="17">No hay pedidos disponibles.</td>
                </tr>
              ) : (
                pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td data-label="Confirmar / Cancelar">
                      <button
                        className="confirmar-btn"
                        onClick={() => confirmarPedido(pedido.id)}
                        // disabled={pedido.estado === "confirmado"} // <-- comenta o elimina esto para pruebas
                      >
                        Confirmar
                      </button>
                      <button
                        className="cancelar-btn"
                        onClick={() => eliminarPedido(pedido.id)}
                      >
                        Cancelar
                      </button>
                      <input type="checkbox" checked={pedido.estado === "confirmado"} readOnly />
                    </td>
                    <td data-label="Número de Pedido (ID)">#{pedido.id}</td>
                    <td data-label="Fecha">{pedido.fecha}</td>
                    <td data-label="Número de Repartidor (ID)">{pedido.repartidorId || "-"}</td>
                    <td data-label="Hora">{pedido.hora}</td>
                    <td data-label="Estado">
                      <div className="estado">
                        <span className="estado-texto">{pedido.estado}</span>
                      </div>
                    </td>
                    <td data-label="Detalle de Producto">
                      {pedido.productos && pedido.productos.length > 0 ? (
                        pedido.productos.map((prod, idx) => (
                          <div key={idx}>{prod.name} (x{prod.quantity})</div>
                        ))
                      ) : (
                        <span>Sin productos</span>
                      )}
                    </td>
                    <td data-label="Nombre">{pedido.nombre}</td>
                    {/* Quitar <td data-label="Apellidos">{pedido.apellidos}</td> */}
                    <td data-label="Dirección">{pedido.direccion}</td>
                    {/* Quitar <td data-label="Ciudad">{pedido.ciudad}</td> */}
                    <td data-label="Teléfono">{pedido.telefono}</td>
                    <td data-label="Medio de Pago">{pedido.medio_pago}</td>
                    <td data-label="Subtotal">${pedido.subtotal}</td>
                    <td data-label="Servicio a Domicilio">${pedido.servicio_domicilio}</td>
                    <td data-label="Total">${pedido.total}</td>
                    <td data-label="Factura">
                      <button className="download-button">Descargar</button>
                    </td>
                    {/* Elimina la celda Acciones */}
                  </tr>
                ))
              )}
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

export default GestionPedidosVendedor;
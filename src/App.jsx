import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Uso Routes y Route sin otro <Router>
import './Global.css';  // Importando los estilos globales


// Rutas de Administrador
import Login from './vistas/Administrador/Login.jsx';
import Inicio from './vistas/Administrador/Inicio.jsx';
import GestionUsuarios from './vistas/Administrador/GestionUsuarios.jsx';
import EditarUsuarios from './vistas/Administrador/EditarUsuarios.jsx';
import EstadoUsuarios from './vistas/Administrador/EstadoUsuarios.jsx';
import ConfiguracionGestionNotificaciones from './vistas/Administrador/ConfiguracionGestionNotificaciones.jsx';
import ConfiguracionPreciosPromociones from './vistas/Administrador/ConfiguracionPreciosPromociones.jsx';
import AnalisisDatos from './vistas/Administrador/AnalisisDatos.jsx';
import GestionQuejasSugerencias from './vistas/Administrador/GestionQuejasSugerencias.jsx';
import ConfiguracionNotificaciones from './vistas/Administrador/ConfiguracionNotificaciones.jsx';
import GestionSeguridad from './vistas/Administrador/GestionSeguridad.jsx';
import GestionTiendas from './vistas/Administrador/GestionTiendas.jsx';
import MonitoreoReportes from './vistas/Administrador/MonitoreoReportes.jsx';

// Rutas de Comprador
import InicioComprador from './vistas/Comprador/InicioComprador.jsx';
import GestionPedidosComprador from './vistas/Comprador/GestionPedidosComprador.jsx';
import VerPedidos from './vistas/Comprador/VerPedidos.jsx';
import DetallesPedidos from './vistas/Comprador/DetallesPedidos.jsx';
import RealizarPedido from './vistas/Comprador/RealizarPedido.jsx';
import NotificacionPedidoComprador from './vistas/Comprador/NotificacionPedidoComprador.jsx';
import FacturaComprador from './vistas/Comprador/FacturaComprador.jsx';
import GeolocalizacionComprador from './vistas/Comprador/GeolocalizacionComprador.jsx';
import ChatRepartidor from './vistas/Comprador/ChatRepartidor.jsx';
import ChatRestaurante from './vistas/Comprador/ChatRestaurante.jsx';
import ChatSoporte from './vistas/Comprador/ChatSoporte.jsx';
import CancelarPedido from './vistas/Comprador/CancelarPedido.jsx';
import GenerarFacturas from './vistas/Comprador/GenerarFacturas.jsx';
import NotificacionesConfiguracion from './vistas/Comprador/NotificacionesConfiguracion.jsx';
import CalificacionEvaluacion from './vistas/Comprador/CalificacionEvaluacion.jsx';

// Rutas de Vendedor
import InicioVendedor from './vistas/Vendedor/InicioVendedor.jsx';
import GestionPedidosVendedor from './vistas/Vendedor/GestionPedidosVendedor.jsx';
import GestionProductos from './vistas/Vendedor/GestionProductos.jsx';
import NotificacionPedidoVendedor from './vistas/Vendedor/NotificacionPedidoVendedor.jsx';
import NotificacionesVendedor from './vistas/Vendedor/NotificacionesVendedor.jsx';
import CalificacionEvaluacionVendedor from './vistas/Vendedor/CalificacionEvaluacionVendedor.jsx';

// Rutas de Repartidor
import InicioRepartidor from './vistas/Repartidor/InicioRepartidor.jsx';
import GestionPedidosRepartidor from './vistas/Repartidor/GestionPedidosRepartidor.jsx';
import VerPedidosRepartidor from './vistas/Repartidor/VerPedidosRepartidor.jsx';
import DetallesPedidosRepartidor from './vistas/Repartidor/DetallesPedidosRepartidor.jsx';
import NotificacionPedidoRepartidor from './vistas/Repartidor/NotificacionPedidoRepartidor.jsx';
import GeolocalizacionRecogida from './vistas/Repartidor/GeolocalizacionRecogida.jsx';
import GeolocalizacionEntrega from './vistas/Repartidor/GeolocalizacionEntrega.jsx';
import ChatComprador from './vistas/Repartidor/ChatComprador.jsx';
import ChatRestauranteRepartidor from './vistas/Repartidor/ChatRestauranteRepartidor.jsx';
import ChatSoporteRepartidor from './vistas/Repartidor/ChatSoporteRepartidor.jsx';
import NotificacionesRepartidor from './vistas/Repartidor/NotificacionesRepartidor.jsx';
import CalificacionEvaluacionRepartidor from './vistas/Repartidor/CalificacionEvaluacionRepartidor.jsx';
import GestionVehiculos from './vistas/Repartidor/GestionVehiculos.jsx';


const App = () => {
  return (
    <div>
      <Routes>
        {/* Ruta para Login */}
        <Route path="/" element={<Login />} />  

         {/* Rutas para Administrador */}
        <Route path="/inicio" element={<Inicio />} />  
        <Route path="/gestion-usuarios" element={<GestionUsuarios />} />  
        <Route path="/editar-usuarios" element={<EditarUsuarios />} />
        <Route path="/estado-usuarios" element={<EstadoUsuarios />} />
        <Route path="/ConfiguracionGestionNotificaciones" element={<ConfiguracionGestionNotificaciones />} />
        <Route path="/ConfiguracionPreciosPromociones" element={<ConfiguracionPreciosPromociones />} />
        <Route path="/AnalisisDatos" element={<AnalisisDatos />} />
        <Route path="/GestionQuejasSugerencias" element={<GestionQuejasSugerencias />} />
        <Route path="/ConfiguracionNotificaciones" element={<ConfiguracionNotificaciones />} />
        <Route path="/GestionSeguridad" element={<GestionSeguridad />} />
        <Route path="/GestionTiendas" element={<GestionTiendas />} />
        <Route path="/MonitoreoReportes" element={<MonitoreoReportes />} />

        {/* Rutas para Comprador */}
        <Route path="/InicioComprador" element={<InicioComprador />} />
        <Route path="/GestionPedidosComprador" element={<GestionPedidosComprador />} />
        <Route path="/VerPedidos" element={<VerPedidos/>} />
        <Route path="/DetallesPedidos" element={<DetallesPedidos/>} />
        <Route path="/RealizarPedido" element={<RealizarPedido/>} />
        <Route path="/NotificacionPedidoComprador" element={<NotificacionPedidoComprador/>} />
        <Route path="/FacturaComprador" element={<FacturaComprador/>} />
        <Route path="/GeolocalizacionComprador" element={<GeolocalizacionComprador/>} />
        <Route path="/ChatRepartidor" element={<ChatRepartidor/>} />
        <Route path="/ChatRestaurante" element={<ChatRestaurante/>} />
        <Route path="/ChatSoporte" element={<ChatSoporte/>} />
        <Route path="/CancelarPedido" element={<CancelarPedido/>} />
        <Route path="/GenerarFacturas" element={<GenerarFacturas/>} />
        <Route path="/NotificacionesConfiguracion" element={<NotificacionesConfiguracion/>} />
        <Route path="/CalificacionEvaluacion" element={<CalificacionEvaluacion/>} />

        {/* Rutas para Vendedor*/}
        <Route path="/InicioVendedor" element={<InicioVendedor />} />
        <Route path="/GestionPedidosVendedor" element={<GestionPedidosVendedor />} />
        <Route path="/GestionProductos" element={<GestionProductos />} />
        <Route path="/NotificacionPedidoVendedor" element={<NotificacionPedidoVendedor />} />
        <Route path="/NotificacionesVendedor" element={<NotificacionesVendedor />} />
        <Route path="/CalificacionEvaluacionVendedor" element={<CalificacionEvaluacionVendedor />} />

        {/* Rutas para Repartidor*/}
        <Route path="/InicioRepartidor" element={<InicioRepartidor />} />
        <Route path="/GestionPedidosRepartidor" element={<GestionPedidosRepartidor/>} />
        <Route path="/VerPedidosRepartidor" element={<VerPedidosRepartidor/>} />
        <Route path="/DetallesPedidosRepartidor" element={<DetallesPedidosRepartidor/>} />
        <Route path="/NotificacionPedidoRepartidor" element={<NotificacionPedidoRepartidor/>} />
        <Route path="/GeolocalizacionRecogida" element={<GeolocalizacionRecogida/>} />
        <Route path="/GeolocalizacionEntrega" element={<GeolocalizacionEntrega/>} />
        <Route path="/ChatComprador" element={<ChatComprador/>} />
        <Route path="/ChatRestauranteRepartidor" element={<ChatRestauranteRepartidor/>} />
        <Route path="/ChatSoporteRepartidor" element={<ChatSoporteRepartidor/>} />
        <Route path="/NotificacionesRepartidor" element={<NotificacionesRepartidor/>} />
        <Route path="/CalificacionEvaluacionRepartidor" element={<CalificacionEvaluacionRepartidor/>} />
        <Route path="/GestionVehiculos" element={<GestionVehiculos/>} />

       

      </Routes>
    </div>
  );
};

export default App;
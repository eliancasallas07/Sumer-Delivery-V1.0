import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import '../../estilos/Vendedor/GestionProductos.css'; // Los estilos

const GestionProductos = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();  // Inicializar useNavigate

  const handleQuantityChange = (subcategoryIndex, productIndex, newQuantity) => {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories];
      const product = updatedCategories[subcategoryIndex].products[productIndex];
      const soldDifference = product.currentQuantity - newQuantity;

      if (soldDifference > 0) {
        product.soldQuantity += soldDifference;
      }

      product.currentQuantity = newQuantity >= 0 ? newQuantity : 0;
      return updatedCategories;
    });
  };

  const handleSwitchToggle = () => {
    setIsConnected(!isConnected);
  };

   // Estado para manejar las subcategorías y productos
   const [categories, setCategories] = useState([
    {
      name: "Aguardiente",
      image: require("../../activos/aguardiente.png"),
      products: [
        {
          name: "Antioqueño",
          image: require("../../activos/antioqueño.png"),
          price: 25000,
          currentQuantity: 50,
          soldQuantity: 5,
        },
        {
          name: "Nectar",
          image: require("../../activos/nectar.png"),
          price: 23000,
          currentQuantity: 40,
          soldQuantity: 3,
        },
      ],
    },
    {
      name: "Whisky",
      image: require("../../activos/whisky.png"),
      products: [
        {
          name: "Old Parr",
          image: require("../../activos/old_parr.png"),
          price: 120000,
          currentQuantity: 30,
          soldQuantity: 2,
        },
        {
          name: "Buchanan's",
          image: require("../../activos/buchanans.png"),
          price: 150000,
          currentQuantity: 20,
          soldQuantity: 1,
        },
      ],
    },
    {
      name: "Cerveza",
      image: require("../../activos/cerveza.png"),
      products: [
        {
          name: "Corona",
          image: require("../../activos/corona.png"),
          price: 8000,
          currentQuantity: 100,
          soldQuantity: 10,
        },
        {
          name: "Aguila",
          image: require("../../activos/aguila.png"),
          price: 6000,
          currentQuantity: 120,
          soldQuantity: 15,
        },
      ],
    },
  ]);


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
        <h2>Gestión de Productos</h2>

        {/* Carrusel de categorías */}
        <div className="carousel-container">
          <div className="carousel-category">
            <button
              className="carousel-button prev"
              onClick={() => alert("Anterior categoría")}
            >
              ←
            </button>

            <div className="category-main">
              <img
                src={require("../../activos/licores.png")}
                alt="Licores"
                className="category-image"
              />
              <h2>Licores</h2>
            </div>

            <button
              className="carousel-button next"
              onClick={() => alert("Siguiente categoría")}
            >
              →
            </button>
          </div>

          {/* Subcategorías */}
          <div className="subcategory-container">
            {categories.map((subcategory, subcategoryIndex) => (
              <div key={subcategoryIndex} className="subcategory-item">
                <img
                  src={subcategory.image}
                  alt={subcategory.name}
                  className="subcategory-image"
                />
                <h3>{subcategory.name}</h3>

                {/* Productos dentro de la subcategoría */}
                <div className="products-container">
                  {subcategory.products.map((product, productIndex) => (
                    <div key={productIndex} className="product-item">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                      <h4>{product.name}</h4>
                      <p>Precio: ${product.price}</p>
                      <div className="quantity-container">
                        <label>Cantidad actual:</label>
                        <input
                          type="number"
                          value={product.currentQuantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              subcategoryIndex,
                              productIndex,
                              parseInt(e.target.value, 10) || 0
                            )
                          }
                          className="quantity-input"
                        />
                      </div>
                      <p>Cantidad vendidas: {product.soldQuantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
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

export default GestionProductos;
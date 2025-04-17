import React, { useState } from "react";
import "../../estilos/Comprador/RealizarPedido.css";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Icono del carrito

const RealizarPedido = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const navigate = useNavigate();

  // Estructura de datos para las categorías, subcategorías y productos
  const categories = [
    {
      name: "Supermercados",
      image: require("../../activos/Supermercado.png"),
      subcategories: [
        {
          name: "Frutas y Verduras",
          image: require("../../activos/frutas.png"),
          stores: [
            {
              name: "Éxito",
              logo: require("../../activos/exito_logo.png"),
              products: [
                {
                  name: "Papas",
                  image: require("../../activos/papas.png"),
                  weight: "1 kg",
                  price: 2500,
                  description:
                    "Papas frescas seleccionadas, ideales para preparar en diversas recetas.",
                },
                {
                  name: "Tomates",
                  image: require("../../activos/tomates.png"),
                  weight: "500 g",
                  price: 1500,
                  description:
                    "Tomates frescos, ideales para ensaladas o salsas.",
                },
              ],
            },
            {
              name: "Jumbo",
              logo: require("../../activos/jumbo_logo.png"),
              products: [
                {
                  name: "Zanahorias",
                  image: require("../../activos/zanahorias.png"),
                  weight: "1 kg",
                  price: 2000,
                  description: "Zanahorias frescas de la mejor calidad.",
                },
                {
                  name: "Lechuga",
                  image: require("../../activos/lechuga.png"),
                  weight: "500 g",
                  price: 1200,
                  description: "Lechuga fresca, perfecta para ensaladas.",
                },
              ],
            },
          ],
        },
        {
          name: "Lácteos y Huevos",
          image: require("../../activos/lacteos.png"),
          stores: [
            {
              name: "Carulla",
              logo: require("../../activos/carulla_logo.png"),
              products: [
                {
                  name: "Leche",
                  image: require("../../activos/leche.png"),
                  weight: "1 L",
                  price: 1800,
                  description: "Leche fresca y de alta calidad.",
                },
                {
                  name: "Huevos",
                  image: require("../../activos/huevos.png"),
                  weight: "12 unidades",
                  price: 8000,
                  description:
                    "Huevos frescos de gallinas criadas en libertad.",
                },
              ],
            },
          ],
        },
        // Puedes agregar más subcategorías aquí
      ],
    },
    {
      name: "Productos de Belleza",
      image: require("../../activos/Belleza.png"),
      subcategories: [
        {
          name: "Cuidado Facial",
          image: require("../../activos/cuidado_facial.png"),
        },
        {
          name: "Cuidado Corporal",
          image: require("../../activos/cuidado_corporal.png"),
        },
        { name: "Cosméticos", image: require("../../activos/cosmeticos.png") },
        { name: "Fragancias", image: require("../../activos/fragancias.png") },
      ],
    },
    {
      name: "Restaurantes",
      image: require("../../activos/Restaurantes.png"),
      subcategories: [
        {
          name: "Comida rápida",
          image: require("../../activos/comida_rapida.png"),
        },
        {
          name: "Comida saludable",
          image: require("../../activos/comida_saludable.png"),
        },
        {
          name: "Cocina internacional",
          image: require("../../activos/cocina_internacional.png"),
        },
        { name: "Postres", image: require("../../activos/postres.png") },
        {
          name: "Bebidas",
          image: require("../../activos/bebidas_restaurantes.png"),
        },
      ],
    },
    {
      name: "Farmacia y Salud",
      image: require("../../activos/Farmacia.png"),
      subcategories: [
        {
          name: "Medicamentos",
          image: require("../../activos/medicamentos.png"),
        },
        {
          name: "Suplementos y vitaminas",
          image: require("../../activos/suplementos.png"),
        },
        {
          name: "Productos de cuidado personal",
          image: require("../../activos/cuidado_personal_farmacia.png"),
        },
        {
          name: "Productos para bebés",
          image: require("../../activos/productos_bebes.png"),
        },
        {
          name: "Productos de higiene",
          image: require("../../activos/higiene.png"),
        },
      ],
    },
    {
      name: "Tecnología y Electrónica",
      image: require("../../activos/Tecnologia.png"),
      subcategories: [
        {
          name: "Accesorios",
          image: require("../../activos/accesorios_tecnologia.png"),
        },
        { name: "Gadgets", image: require("../../activos/gadgets.png") },
        {
          name: "Componentes electrónicos",
          image: require("../../activos/componentes.png"),
        },
        {
          name: "Equipos de computación",
          image: require("../../activos/equipos_computacion.png"),
        },
      ],
    },
    {
      name: "Ropa y Accesorios",
      image: require("../../activos/Ropa.png"),
      subcategories: [
        {
          name: "Ropa para hombres",
          image: require("../../activos/ropa_hombres.png"),
        },
        {
          name: "Ropa para mujeres",
          image: require("../../activos/ropa_mujeres.png"),
        },
        { name: "Calzado", image: require("../../activos/calzado.png") },
        {
          name: "Accesorios",
          image: require("../../activos/accesorios_ropa.png"),
        },
        {
          name: "Ropa deportiva",
          image: require("../../activos/ropa_deportiva.png"),
        },
      ],
    },
    {
      name: "Hogar y Decoración",
      image: require("../../activos/Hogar.png"),
      subcategories: [
        { name: "Muebles", image: require("../../activos/muebles.png") },
        { name: "Decoración", image: require("../../activos/decoracion.png") },
        {
          name: "Utensilios de cocina",
          image: require("../../activos/utensilios_cocina.png"),
        },
        {
          name: "Artículos de limpieza",
          image: require("../../activos/articulos_limpieza.png"),
        },
      ],
    },
    {
      name: "Mascotas",
      image: require("../../activos/Mascotas.png"),
      subcategories: [
        {
          name: "Alimentos para mascotas",
          image: require("../../activos/alimentos_mascotas.png"),
        },
        { name: "Juguetes", image: require("../../activos/juguetes.png") },
        {
          name: "Accesorios",
          image: require("../../activos/accesorios_mascotas.png"),
        },
        {
          name: "Higiene para mascotas",
          image: require("../../activos/higiene_mascotas.png"),
        },
      ],
    },
    {
      name: "Electrodomésticos",
      image: require("../../activos/Electrodomesticos.png"),
      subcategories: [
        {
          name: "Grandes Electrodomésticos",
          image: require("../../activos/grandes_electrodomesticos.png"),
        },
        {
          name: "Pequeños Electrodomésticos",
          image: require("../../activos/pequenos_electrodomesticos.png"),
        },
        {
          name: "Aparatos de climatización",
          image: require("../../activos/aparatos_climatizacion.png"),
        },
      ],
    },
    {
      name: "Entretenimiento",
      image: require("../../activos/Entretenimiento.png"),
      subcategories: [
        {
          name: "Libros y revistas",
          image: require("../../activos/libros.png"),
        },
        {
          name: "Juegos de mesa",
          image: require("../../activos/juegos_mesa.png"),
        },
        {
          name: "Películas y series",
          image: require("../../activos/peliculas.png"),
        },
      ],
    },
    {
      name: "Artículos de Oficina y Papelería",
      image: require("../../activos/Oficina.png"),
      subcategories: [
        {
          name: "Material de oficina",
          image: require("../../activos/material_oficina.png"),
        },
        {
          name: "Mobiliario de oficina",
          image: require("../../activos/mobiliario_oficina.png"),
        },
        {
          name: "Artículos de tecnología para oficina",
          image: require("../../activos/articulos_tecnologia_oficina.png"),
        },
      ],
    },
  ];

  //Funcion de Redireccion de Comfirmar Pedido

  const handleNotificacionPedidoCompradorClick = () => {
    console.log("Redirigiendo a /NotificacionPedidoComprador"); // Ver si el mensaje aparece en la consola
    navigate("/NotificacionPedidoComprador");
  };

  // Función para manejar el click en la subcategoría
  const handleSubcategoryClick = () => {
    setShowSubcategories(true);
  };

  // Manejo de la adición al carrito
  const handleAddToCart = (product) => {
    // Comprobar si el producto ya existe en el carrito
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.name === product.name
      );
      if (existingProduct) {
        // Si el producto ya existe, actualizar la cantidad
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 } // Aumentar la cantidad
            : item
        );
      } else {
        // Si no existe, agregar el producto con cantidad 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Actualizar el subtotal
    setSubtotal((prevSubtotal) => prevSubtotal + product.price);
  };

  // Redirigir al carrito
  const handleGoToCart = () => {
    navigate("/carrito");
  };

  // Manejo del toggle de conexión
  const handleSwitchToggle = () => {
    setIsConnected((prevState) => !prevState);
  };

  // Variables de categoría seleccionada
  const category = categories[selectedCategoryIndex];

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
          <button className="button-inicio" onClick={() => navigate("/InicioComprador")}>
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
        </div>

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
      </header>

      <main className="main">
        <h2>Realizar Pedido</h2>

        <div className="carousel-container">
          <div className="carousel-category">
            <button
              onClick={() =>
                setSelectedCategoryIndex((prevIndex) => prevIndex - 1)
              }
              className="carousel-button prev"
            >
              ←
            </button>

            <div className="category-main" onClick={handleSubcategoryClick}>
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
              />
              <h2>{category.name}</h2>
            </div>

            <button
              onClick={() =>
                setSelectedCategoryIndex((prevIndex) => prevIndex + 1)
              }
              className="carousel-button next"
            >
              →
            </button>
          </div>

          {showSubcategories && (
            <div className="subcategory-container">
              {category.subcategories.map((subcategory, index) => (
                <div key={index} className="subcategory-item">
                  <img
                    src={subcategory.image}
                    alt={subcategory.name}
                    className="subcategory-image"
                  />
                  <h3>{subcategory.name}</h3>

                  {subcategory.stores.map((store) => (
                    <div key={store.name} className="store-container">
                      <h4>{store.name}</h4>

                      {/* Tabla de productos para cada tienda */}
                      <div className="store-table-container">
                        <table className="products-table">
                          <thead>
                            <tr>
                              <th>Tienda</th>
                              <th>Producto</th>
                              <th>Peso</th>
                              <th>Precio</th>
                              <th>Descripción</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {store.products.map((product) => (
                              <tr key={product.name}>
                                <td>
                                  <img
                                    src={store.logo}
                                    alt={store.name}
                                    className="store-logo"
                                  />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.weight}</td>
                                <td>${product.price}</td>
                                <td>{product.description}</td>
                                <td>
                                  <button
                                    onClick={() => handleAddToCart(product)}
                                  >
                                    Agregar
                                  </button>
                                  <button
                                    onClick={() =>
                                      navigate(`/tienda/${store.name}`)
                                    }
                                  >
                                    Ir a la tienda
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {/* Fin de tabla para cada tienda */}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sección del carrito */}
        <div className="cart-icon-container">
          <button onClick={handleGoToCart} className="cart-button">
            <FaShoppingCart size={30} />
          </button>

          <div className="cart-details">
            {/* Mostrar productos del carrito */}
            {cart.length > 0 ? (
              <div className="cart-items">
                <h4>Productos en el carrito:</h4>
                <ul>
                  {cart.map((item, index) => (
                    <li key={index}>
                      {item.name} (x{item.quantity}) - $
                      {item.price * item.quantity}
                    </li>
                  ))}
                </ul>
                <div className="subtotal">
                  <strong>Subtotal: ${subtotal}</strong>
                </div>

                {/* Botón de Confirmar pedido */}
                <button
                  onClick={() => {
                    handleNotificacionPedidoCompradorClick(); // Llamada a tu función
                    navigate("/NotificacionPedidoComprador"); // Navegación a la ruta
                  }}
                >
                  Confirmar Pedido
                </button>
              </div>
            ) : (
              <p>No hay productos en el carrito.</p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="TextoFooter">
          <p>© 2025 Sumer Delivery - Todos los derechos reservados</p>
        </div>

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

export default RealizarPedido;

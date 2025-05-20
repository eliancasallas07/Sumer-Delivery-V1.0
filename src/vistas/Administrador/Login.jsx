import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import "../../estilos/Administrador/Login.css";

import "../../Global.css";

const Login = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("administrador");

  const navigate = useNavigate();

  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0();

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Acceso directo para adminelian/admin123
    if (username === "adminelian" && password === "admin123") {
      navigate("/inicio");
      return;
    }
    // Acceso directo para comprador de prueba
    if (username === "comprador1" && password === "comprador123") {
      navigate("/iniciocomprador");
      return;
    }
    // Acceso directo para vendedor de prueba
    if (username === "vendedor1" && password === "vendedor123") {
      navigate("/iniciovendedor");
      return;
    }
    // Acceso directo para repartidor de prueba
    if (username === "repartidor1" && password === "repartidor123") {
      navigate("/iniciorepartidor");
      return;
    }

    let endpoint = "";

    if (role === "administrador") {
      endpoint = "login-admin";
    } else if (role === "comprador") {
      endpoint = "login-compradores";
    } else if (role === "vendedor") {
      endpoint = "login-vendedor";
    } else if (role === "repartidor") {
      endpoint = "login-repartidor";
    }

    fetch(`http://localhost:3000/api/${endpoint}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        usuario: username,

        contrasena: password,
      }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Error al autenticar");
        }

        console.log("✅ Login local exitoso:", data);

        // Redirigir según el rol

        if (data.rol === "administrador") {
          navigate("/inicio");
        } else if (data.rol === "comprador") {
          navigate("/iniciocomprador");
        } else if (data.rol === "vendedor") {
          navigate("/iniciovendedor");
        } else if (data.rol === "repartidor") {
          navigate("/iniciorepartidor");
        } else {
          alert("Rol no reconocido.");
        }
      })

      .catch((error) => {
        console.error("❌ Error en login:", error.message);

        alert("Error al autenticar: " + error.message);
      });
  };

  // Redirigir solo si viene de Auth0 (evitamos conflictos con login local)

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      console.log("🔐 Usuario autenticado con Auth0:", user);

      navigate("/inicio"); // O según el rol que tengas en Auth0
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  // Si quieres usar el botón de login con Auth0

  const handleLoginWithAuth0 = () => {
    loginWithRedirect(); // Redirige al login de Auth0
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h1>Login Sumer Delivery</h1>
        </div>
        <div className="header-logo">
          <img
            src={require("../../activos/Logotipo.png")}
            alt="Logo Sumer"
            className="header-logo"
          />
        </div>
      </header>

      {/* Main */}
      <main className="main">
        <h2 className="form-title">Inicio de sesión</h2>

        {!isAuthenticated ? (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Nombre de Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Rol</label>
              <select id="role" value={role} onChange={handleRoleChange}>
                <option value="administrador">Administrador</option>
                <option value="comprador">Comprador</option>
                <option value="vendedor">Vendedor</option>
                <option value="repartidor">Repartidor</option>
              </select>
            </div>
            <div className="forgot-password">
              <a href="https://wa.me/1234567890">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="submit-btn">
              Iniciar sesión
            </button>

            <div className="register-text">
              <a href="https://wa.me/1234567890">¿No tienes cuenta?</a>
            </div>
          </form>
        ) : (
          <div className="welcome-message">
            <h3>Bienvenido, {user.name}!</h3>
            <button onClick={() => ({ returnTo: window.location.origin })}>
              Cerrar sesión
            </button>
          </div>
        )}

        {/* Botón para iniciar sesión con Google */}
        <div className="auth0-login">
          <button onClick={handleLoginWithAuth0} className="auth0-btn">
            {/* Logo de Google  */}
            <img
              src={require("../../activos/logo-google.png")}
              alt="Google"
              className="google-logo"
            />
            Iniciar sesión con Google
          </button>
        </div>
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

export default Login;

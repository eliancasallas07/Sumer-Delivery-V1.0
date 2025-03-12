import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";  // Importar hook de Auth0
import "../../estilos/Administrador/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("administrador");
  const navigate = useNavigate();

  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0(); // Funciones de Auth0

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lógica de autenticación local (solo si no estás autenticado con Auth0)
    if (!isAuthenticated) {
      if (
        username === "elian casallas" &&
        password === "123456" &&
        role === "administrador"
      ) {
        console.log("Login exitoso");
        navigate("/inicio");
      } else if (
        username === "comprador1" &&
        password === "456789" &&
        role === "comprador"
      ) {
        console.log("Login exitoso");
        navigate("/inicioComprador");
      } else {
        console.log("Datos incorrectos");
        alert("Usuario, contraseña o rol incorrectos.");
      }
    }
  };

  // Redirigir si ya está autenticado con Auth0
  if (isAuthenticated) {
    navigate("/inicio");
  }

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
            <button onClick={() => logout({ returnTo: window.location.origin })}>
              Cerrar sesión
            </button>
          </div>
        )}

        {/* Botón para iniciar sesión con Google */}
        <div className="auth0-login">
          <button onClick={handleLoginWithAuth0} className="auth0-btn">
            {/* Usando el logo de Google desde el archivo importado */}
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



// Pantalla de login

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Aquí agregamos useNavigate
import "../../estilos/Administrador/Login.css"; // Los estilos

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("administrador"); // Estado para manejar el rol
  const navigate = useNavigate(); // Hook para la navegación

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el usuario, contraseña y rol
    if (
      username === "elian casallas" &&
      password === "123456" &&
      role === "administrador"
    ) {
      console.log("Login exitoso");
      // Redirigir a la página de "Inicio" para el Administrador
      navigate("/inicio");
    } else if (
      username === "comprador1" &&
      password === "456789" &&
      role === "comprador"
    ) {
      console.log("Login exitoso");
      // Redirigir a la página de "Inicio" para el Comprador
      navigate("/inicioComprador");
    } else {
      console.log("Datos incorrectos");
      alert("Usuario, contraseña o rol incorrectos.");
    }
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
            <Link to="https://wa.me/1234567890">¿Olvidaste tu contraseña?</Link>
          </div>

          <button type="submit" className="submit-btn">
            Iniciar sesión
          </button>

          <div className="register-text">
            <Link to="https://wa.me/1234567890">¿No tienes cuenta?</Link>
          </div>
        </form>
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

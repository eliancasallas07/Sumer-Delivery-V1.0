const express = require('express');
const router = express.Router();
const db = require('../database');
const { comparePasswords } = require('../utils/auth'); // Importa la función
const bcrypt = require('bcrypt');

// Ruta de prueba para verificar conexión
router.get('/test', (req, res) => {
  console.log('🔧 Test GET fue solicitado');
  res.send('🧪 Ruta /api/login-admin/test funcionando correctamente');
});

// Ruta para iniciar sesión como administrador
router.post('/', async (req, res) => { // Usa async
  const { usuario, contrasena } = req.body;
  console.log('➡️ Intento de login para el usuario:', usuario);
  console.log('➡️ Contraseña ingresada:', contrasena);

  const sql = 'SELECT * FROM administrador WHERE usuario = ?';
  db.query(sql, [usuario], async (err, results) => { // Usa async
    if (err) {
      console.error('❌ Error al buscar administrador:', err);
      return res.status(500).json({ error: 'Error al iniciar sesión' });
    }

    console.log('➡️ Resultados de la búsqueda en la base de datos:', results);

    if (results.length === 0) {
      console.log('⚠️ Usuario no encontrado.');
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const admin = results[0];
    console.log('➡️ Administrador encontrado:', admin);
    console.log('➡️ Contraseña hasheada en la BD:', admin.contrasena);

    const isMatch = await comparePasswords(contrasena, admin.contrasena);
    console.log('➡️ Resultado de la comparación de contraseñas:', isMatch);

    if (isMatch) {
      res.json({ message: '🟢 Inicio de sesión exitoso', rol: 'administrador' });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  });
});

module.exports = router;
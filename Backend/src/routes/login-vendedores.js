const express = require('express');
const router = express.Router();
const db = require('../database');
const { comparePasswords } = require('../utils/auth'); // Importa la función
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => { // Usa async
    const { usuario, contrasena } = req.body;

    const sql = 'SELECT * FROM administrador WHERE usuario = ?';
    db.query(sql, [usuario], async (err, results) => { // Usa async
        if (err) {
            console.error('❌ Error al buscar administrador:', err);
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const admin = results[0];
        const isMatch = await comparePasswords(contrasena, admin.contrasena); // Llama a la función

        if (isMatch) {
            res.json({ message: '🟢 Inicio de sesión exitoso', rol: 'administrador' });
        } else {
            res.status(401).json({ error: 'Credenciales inválidas' });
        }
    });
});


module.exports = router; // Si creaste un archivo separado
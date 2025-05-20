const express = require('express');
require('dotenv').config();
const cors = require('cors');
const db = require('./database');
const bcrypt = require('bcrypt'); // Importa bcrypt

// Rutas de login
const loginAdminRoutes = require('./routes/login-admin');
const loginCompradorRoutes = require('./routes/login-compradores');
const loginVendedorRoutes = require('./routes/login-vendedores');
const loginRepartidorRoutes = require('./routes/login-repartidores');

const app = express();
const PORT = process.env.PORT || 3000;
const saltRounds = 10;  // Número de rondas de sal, un valor de 10 es común

// Configurar CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Logging
app.use((req, res, next) => {
    console.log(`Solicitud recibida: ${req.method} ${req.url}`);
    next();
});

// Función para crear tablas si no existen
const createTables = () => {
    const compradorTableQuery = `
        CREATE TABLE IF NOT EXISTS comprador (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        apellidos VARCHAR(255) NOT NULL,
        telefono VARCHAR(20) NOT NULL,
        correo_electronico VARCHAR(255) UNIQUE NOT NULL,
        direccion VARCHAR(255) NOT NULL,
        ciudad_residencia VARCHAR(100) NOT NULL,
        usuario VARCHAR(50) UNIQUE NOT NULL,
        clave_hash VARCHAR(255) NOT NULL,
        calificacion INT,
        medio_pago VARCHAR(50)
        );
    `;

    const vendedorTableQuery = `
        CREATE TABLE IF NOT EXISTS vendedor (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        apellidos VARCHAR(255) NOT NULL,
        telefono VARCHAR(20) NOT NULL,
        correo_electronico VARCHAR(255) UNIQUE NOT NULL,
        direccion VARCHAR(255) NOT NULL,
        ciudad_residencia VARCHAR(100) NOT NULL,
        usuario VARCHAR(50) UNIQUE NOT NULL,
        clave_hash VARCHAR(255) NOT NULL,
        nombre_tienda VARCHAR(255) NOT NULL,
        calificacion INT,
        medio_pago VARCHAR(50)
        );
    `;

    const repartidorTableQuery = `
        CREATE TABLE IF NOT EXISTS repartidor (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        apellidos VARCHAR(255) NOT NULL,
        telefono VARCHAR(20) NOT NULL,
        correo_electronico VARCHAR(255) UNIQUE NOT NULL,
        direccion VARCHAR(255) NOT NULL,
        ciudad_residencia VARCHAR(100) NOT NULL,
        usuario VARCHAR(50) UNIQUE NOT NULL,
        clave_hash VARCHAR(255) NOT NULL,
        documentos_vehiculo VARCHAR(255)
        );
    `;

    const adminTableQuery = `
        CREATE TABLE IF NOT EXISTS administrador (
            id_administrador INT AUTO_INCREMENT PRIMARY KEY,
            usuario VARCHAR(50) NOT NULL UNIQUE,
            contrasena VARCHAR(255) NOT NULL,
            rol VARCHAR(50) NOT NULL
        );
        `;

    db.execute(compradorTableQuery, (err) => {
        if (err) {
            console.error("Error al crear tabla comprador:", err);
            return res.status(500).json({ error: 'Error al crear tabla comprador: ' + err.message });
        }
    });
    db.execute(vendedorTableQuery, (err) => {
        if (err) {
            console.error("Error al crear tabla vendedor:", err);
            return res.status(500).json({ error: 'Error al crear tabla vendedor: ' + err.message });
        }
    });
    db.execute(repartidorTableQuery, (err) => {
        if (err) {
            console.error("Error al crear tabla repartidor:", err);
            return res.status(500).json({ error: 'Error al crear tabla repartidor: ' + err.message });
        }
    });
    db.execute(adminTableQuery, (err) => {
        if (err) {
            console.error("Error al crear la tabla administrador:", err);
            return res.status(500).json({ error: "Error al crear la tabla administrador: " + err.message });
        }
    });
};

// Llamar a la función para crear las tablas al iniciar el servidor
createTables();

// Rutas de login
app.use('/api/login-admin', loginAdminRoutes);
app.use('/api/login-compradores', loginCompradorRoutes);
app.use('/api/login-vendedores', loginVendedorRoutes);
app.use('/api/login-repartidores', loginRepartidorRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('🚀 Backend funcionando');
});

// Obtener todos los compradores
app.get('/compradores', (req, res) => {
    const sql = 'SELECT * FROM comprador';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('❌ Error al obtener compradores:', err);
            return res.status(500).json({ error: 'Error al obtener compradores: ' + err.message }); // Enviar JSON
        }
        res.json(results); // Enviar JSON
    });
});

// Registrar comprador
app.post('/api/compradores', async (req, res) => {
    const {
        nombre,
        apellidos,
        telefono,
        correo_electronico,
        direccion,
        calificacion,
        medio_pago,
        ciudad_residencia,
        usuario,
        contrasena
    } = req.body;

    try {
        // Verificar si el usuario o correo electrónico ya existen
        const checkUserSql = 'SELECT * FROM comprador WHERE usuario = ? OR correo_electronico = ?';
        db.query(checkUserSql, [usuario, correo_electronico], async (checkErr, checkResults) => {
            if (checkErr) {
                console.error('Error al verificar usuario:', checkErr);
                return res.status(500).json({ error: 'Error al verificar usuario' });
            }

            if (checkResults.length > 0) {
                return res.status(400).json({ error: 'Usuario o correo electrónico ya existen' });
            }
            // Hash de la contraseña con bcrypt
            const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

            const sql = `
                INSERT INTO comprador
                (nombre, apellidos, telefono, correo_electronico, direccion, calificacion, medio_pago, ciudad_residencia, usuario, clave_hash)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                nombre,
                apellidos,
                telefono,
                correo_electronico,
                direccion,
                calificacion,
                medio_pago,
                ciudad_residencia,
                usuario,
                hashedPassword
            ];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error('❌ Error al registrar comprador:', err);
                    return res.status(500).json({ error: 'Error al registrar comprador: ' + err.message }); // Enviar JSON
                }

                res.status(201).json({ // Enviar JSON
                    message: '🟢 Comprador registrado con éxito',
                    id: result.insertId
                });
            });
        });
    } catch (error) {
        console.error('❌ Error al hashear la contraseña:', error);
        return res.status(500).json({ error: 'Error al registrar comprador: Error al hashear la contraseña' });
    }
});


// Registrar vendedor
app.post('/api/vendedores', async (req, res) => {  // Usar async
    const {
        nombre,
        apellidos,
        telefono,
        correo_electronico,
        direccion,
        calificacion,
        medio_pago,
        ciudad_residencia,
        usuario,
        contrasena,
        nombre_tienda
    } = req.body;

    try {
        // Hash de la contraseña con bcrypt
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        const sql = `
            INSERT INTO vendedor
            (nombre, apellidos, telefono, correo_electronico, direccion, calificacion, medio_pago, ciudad_residencia, usuario, clave_hash, nombre_tienda)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            nombre,
            apellidos,
            telefono,
            correo_electronico,
            direccion,
            calificacion,
            medio_pago,
            ciudad_residencia,
            usuario,
            hashedPassword,
            nombre_tienda
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('❌ Error al registrar vendedor:', err);
                return res.status(500).json({ error: 'Error al registrar vendedor: ' + err.message }); // Enviar JSON
            }

            console.log('✅ Registrado con éxito:', result);

            res.status(201).json({  // Enviar JSON
                message: '🟢 Vendedor registrado con éxito',
                id: result.insertId
            });
        });
    } catch (error) {
        console.error('❌ Error al hashear la contraseña:', error);
        return res.status(500).json({ error: 'Error al registrar vendedor: Error al hashear la contraseña' });
    }
});

// Registrar repartidor
app.post('/api/repartidores', async (req, res) => {  // Usar async
    const {
        nombre,
        apellidos,
        telefono,
        correo_electronico,
        direccion,
        ciudad_residencia,
        usuario,
        contrasena,
        documentos_vehiculo
    } = req.body;

    try {
        // Hash de la contraseña con bcrypt
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
        const sql = `
            INSERT INTO repartidor
            (nombre, apellidos, telefono, correo_electronico, direccion, ciudad_residencia, usuario, clave_hash, documentos_vehiculo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            nombre,
            apellidos,
            telefono,
            correo_electronico,
            direccion,
            ciudad_residencia,
            usuario,
            hashedPassword,
            documentos_vehiculo
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('❌ Error al registrar repartidor:', err);
                return res.status(500).json({ error: 'Error al registrar repartidor: ' + err.message }); // Enviar JSON
            }

            res.status(201).json({  // Enviar JSON
                message: '🟢 Repartidor registrado con éxito',
                id: result.insertId
            });
        });
    } catch (error) {
        console.error('❌ Error al hashear la contraseña:', error);
        return res.status(500).json({ error: 'Error al registrar repartidor: Error al hashear la contraseña' });
    }
});

// --- GUARDAR PEDIDO EN BASE DE DATOS ---
app.post('/api/pedidos', (req, res) => {
    const pedido = req.body;
    // DEBUG: Muestra el pedido recibido en consola
    console.log("Pedido recibido en backend:", pedido);

    // Validación mejorada para depurar
    if (!pedido || !pedido.productos || !Array.isArray(pedido.productos) || pedido.productos.length === 0 || pedido.subtotal === undefined || pedido.subtotal === null) {
        // Mostrar los datos recibidos para depuración
        console.error("Datos recibidos:", pedido);
        return res.status(400).json({ error: "Datos de pedido incompletos", body: pedido });
    }

    // Recoge los nuevos campos
    const nombre = pedido.nombre || "";
    const direccion = pedido.direccion || "";
    const telefono = pedido.telefono || "";
    const medio_pago = pedido.medio_pago || "";
    const subtotal = pedido.subtotal;
    const servicio_domicilio = 3000; // Puedes calcularlo o recibirlo del frontend
    const total = Number(subtotal) + Number(servicio_domicilio);

    const fecha = new Date().toISOString().slice(0, 10);
    const hora = new Date().toLocaleTimeString('en-GB', { hour12: false });
    const estado = "pendiente";

    const sqlPedido = `
        INSERT INTO pedido (fecha, hora, subtotal, estado, nombre, direccion, telefono, medio_pago, servicio_domicilio, total)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sqlPedido, [fecha, hora, subtotal, estado, nombre, direccion, telefono, medio_pago, servicio_domicilio, total], (err, result) => {
        if (err) {
            console.error('❌ Error al guardar pedido:', err);
            return res.status(500).json({ error: 'Error al guardar pedido: ' + err.message });
        }
        const pedidoId = result.insertId;

        // Insertar productos del pedido
        const productos = pedido.productos;
        if (!Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({ error: "No hay productos en el pedido" });
        }

        const values = productos.map(prod => [
            pedidoId,
            prod.name,
            prod.quantity,
            prod.price
        ]);

        const sqlProductos = `
            INSERT INTO pedido_producto (pedido_id, nombre_producto, cantidad, precio_unitario)
            VALUES ?
        `;
        db.query(sqlProductos, [values], (err2) => {
            if (err2) {
                console.error('❌ Error al guardar productos del pedido:', err2);
                return res.status(500).json({ error: 'Error al guardar productos del pedido: ' + err2.message });
            }
            res.status(201).json({ mensaje: "Pedido recibido", pedidoId });
        });
    });
});

// Endpoint para obtener todos los pedidos (para el vendedor)
app.get('/api/pedidos', (req, res) => {
    const sql = `
        SELECT p.id, p.fecha, p.hora, p.estado, p.subtotal, p.nombre, p.direccion, p.telefono, p.medio_pago, p.servicio_domicilio, p.total,
               pp.nombre_producto, pp.cantidad, pp.precio_unitario
        FROM pedido p
        LEFT JOIN pedido_producto pp ON p.id = pp.pedido_id
        ORDER BY p.id DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('❌ Error al obtener pedidos:', err);
            return res.status(500).json({ error: 'Error al obtener pedidos: ' + err.message });
        }
        // Agrupar productos por pedido
        const pedidosMap = {};
        results.forEach(row => {
            if (!pedidosMap[row.id]) {
                pedidosMap[row.id] = {
                    id: row.id,
                    fecha: row.fecha,
                    hora: row.hora,
                    estado: row.estado,
                    subtotal: row.subtotal,
                    nombre: row.nombre,
                    direccion: row.direccion,
                    telefono: row.telefono,
                    medio_pago: row.medio_pago,
                    servicio_domicilio: row.servicio_domicilio,
                    total: row.total,
                    productos: []
                };
            }
            if (row.nombre_producto) {
                pedidosMap[row.id].productos.push({
                    name: row.nombre_producto,
                    quantity: row.cantidad,
                    price: row.precio_unitario
                });
            }
        });
        const pedidos = Object.values(pedidosMap);
        res.json(pedidos);
    });
});

// Eliminar pedido por ID (y sus productos asociados)
app.delete('/api/pedidos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'ID de pedido inválido' });
    }
    // Verifica si el pedido existe antes de intentar eliminarlo
    db.query('SELECT id FROM pedido WHERE id = ?', [id], (err, rows) => {
        if (err) {
            console.error('❌ Error al buscar pedido:', err);
            return res.status(500).json({ error: 'Error al buscar pedido' });
        }
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        // Primero elimina los productos asociados
        db.query('DELETE FROM pedido_producto WHERE pedido_id = ?', [id], (err) => {
            if (err) {
                console.error('❌ Error al eliminar productos del pedido:', err);
                return res.status(500).json({ error: 'Error al eliminar productos del pedido' });
            }
            // Luego elimina el pedido
            db.query('DELETE FROM pedido WHERE id = ?', [id], (err2, result) => {
                if (err2) {
                    console.error('❌ Error al eliminar pedido:', err2);
                    return res.status(500).json({ error: 'Error al eliminar pedido' });
                }
                // Log para depuración
                console.log(`Pedido con id ${id} eliminado correctamente`);
                res.json({ mensaje: 'Pedido eliminado' });
            });
        });
    });
});

// Endpoint para confirmar pedido (cambiar estado a "confirmado")
app.put('/api/pedidos/:id/confirmar', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'ID de pedido inválido' });
    }
    db.query('UPDATE pedido SET estado = "confirmado" WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('❌ Error al confirmar pedido:', err);
            return res.status(500).json({ error: 'Error al confirmar pedido' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        res.json({ mensaje: 'Pedido confirmado' });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`);
});
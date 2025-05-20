const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Drako#2025',
  database: 'sumerdelivery',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error al conectar con el pool de la base de datos:', err);
    return;
  }
  console.log('🟢 Conexión al pool de base de datos establecida');
  connection.release(); // Importante: liberar la conexión después de probarla
});

module.exports = db;

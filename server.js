const express = require('express');
const app = express();

app.use(express.json());

// Ruta para recibir pedidos
app.post('/api/pedidos', (req, res) => {
  // Aquí puedes guardar el pedido en la base de datos
  console.log('Pedido recibido:', req.body);
  res.json({ mensaje: "Pedido recibido" });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});
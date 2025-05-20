const express = require('express');
const app = express();

app.get('/test/:id', (req, res) => {
  res.send(`ID recibido: ${req.params.id}`);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
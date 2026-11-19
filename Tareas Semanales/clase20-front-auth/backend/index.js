const express = require('express');
const cors = require('cors');
const conectarDB = require('./db');
const productosRouter = require('./routes/productos');
const usuariosRouter = require('./routes/usuarios');

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use('/api/productos', productosRouter);
app.use('/api/usuarios', usuariosRouter);

app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  // Dos registros simultáneos con el mismo email pasan el findOne: el índice unique lo frena.
  if (err.code === 11000) {
    return res.status(409).json({ mensaje: 'Ya existe un registro con ese valor' });
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({ mensaje: err.message });
  }
  console.error(err);
  res.status(err.status || 500).json({ mensaje: err.message || 'Error interno' });
});

const PORT = process.env.PORT || 3000;
conectarDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
});

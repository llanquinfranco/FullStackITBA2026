const express = require('express');
const Product = require('../models/Product');
const { verificarToken, soloAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const productos = await Product.find();
  res.json(productos);
});

router.get('/:id', async (req, res) => {
  const producto = await Product.findById(req.params.id);
  if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  res.json(producto);
});

// GET siguen públicas. Escribir requiere token Y rol admin, en ese orden.
router.post('/', verificarToken, soloAdmin, async (req, res) => {
  const producto = await Product.create(req.body);
  res.status(201).json(producto);
});

router.put('/:id', verificarToken, soloAdmin, async (req, res) => {
  const producto = await Product.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });
  if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  res.json(producto);
});

router.delete('/:id', verificarToken, soloAdmin, async (req, res) => {
  const producto = await Product.findByIdAndDelete(req.params.id);
  if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  res.json({ mensaje: 'Producto eliminado' });
});

module.exports = router;

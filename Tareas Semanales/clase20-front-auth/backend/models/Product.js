const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    descripcion: String,
    precio: { type: Number, required: [true, 'El precio es obligatorio'] },
    stock: { type: Number, default: 0 },
    imagenUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);

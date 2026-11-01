const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria",
    },
});

const Producto = mongoose.model("Producto",productoSchema);
module.exports = Producto;
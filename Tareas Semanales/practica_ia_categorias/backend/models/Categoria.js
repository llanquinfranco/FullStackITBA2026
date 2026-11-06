const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "El nombre de la categoría es obligatorio"],
            unique: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Categoria = mongoose.model("Categoria", categoriaSchema);

module.exports = Categoria;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "El nombre es obligatorio"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "El email es obligatorio"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "La contraseña es obligatoria"],
        },
        rol: {
            type: String,
            enum: ["cliente", "admin"],
            default: "cliente",
        },
    },
    {
        timestamps: true,
    }
);

usuarioSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;

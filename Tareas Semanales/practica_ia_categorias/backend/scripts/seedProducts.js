
const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("../models/Product");
const Categoria = require("../models/Categoria");
const productos = require("../data/productos");

const cargarCategorias = async () => {
    const nombres = [...new Set(productos.map((producto) => producto.categoria).filter(Boolean))];
    const categoriasPorNombre = {};

    for (const nombre of nombres) {
        const categoria = await Categoria.findOneAndUpdate(
            { nombre },
            { nombre },
            { upsert: true, new: true, runValidators: true }
        );

        categoriasPorNombre[nombre] = categoria._id;
    }

    return categoriasPorNombre;
};

const cargarProductos = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("No se encontró MONGODB_URI en el archivo .env");
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Conectado a MongoDB Atlas");

        const categoriasPorNombre = await cargarCategorias();

        let creados = 0;
        let actualizados = 0;

        for (const producto of productos) {
            const { id, categoria, imagen, nombre, ...datos } = producto;

            const payload = {
                ...datos,
                nombre,
                categoria: categoriasPorNombre[categoria] || undefined,
                imagenUrl: imagen || "",
            };

            const resultado = await Product.updateOne(
                { nombre },
                { $set: payload },
                { upsert: true, runValidators: true }
            );

            if (resultado.upsertedCount > 0) {
                creados++;
                console.log(`Producto creado: ${nombre}`);
            } else if (resultado.modifiedCount > 0) {
                actualizados++;
                console.log(`Producto actualizado: ${nombre}`);
            } else {
                console.log(`Sin cambios: ${nombre}`);
            }
        }

        console.log("\nCarga finalizada");
        console.log(`Productos nuevos: ${creados}`);
        console.log(`Productos actualizados: ${actualizados}`);
        console.log(`Total procesados: ${productos.length}`);
    } catch (error) {
        console.error("Error al cargar productos:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

cargarProductos();

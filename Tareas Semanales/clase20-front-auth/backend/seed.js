// Carga productos de ejemplo y dos usuarios: un admin y un cliente.
// Uso: npm run seed   (BORRA los productos y usuarios que haya)
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Product = require('./models/Product');
const Usuario = require('./models/Usuario');

const productos = [
  { nombre: 'Silla Belgrano', descripcion: 'Silla de roble con asiento tapizado', precio: 85000, stock: 12 },
  { nombre: 'Mesa Recoleta', descripcion: 'Mesa de comedor extensible, 6 personas', precio: 420000, stock: 3 },
  { nombre: 'Sillón Palermo', descripcion: 'Sillón de dos cuerpos en lino', precio: 690000, stock: 2 },
  { nombre: 'Biblioteca San Telmo', descripcion: 'Biblioteca de pino con cinco estantes', precio: 230000, stock: 5 },
  { nombre: 'Escritorio Almagro', descripcion: 'Escritorio con cajonera', precio: 310000, stock: 4 },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Product.deleteMany({});
  await Product.insertMany(productos);

  await Usuario.deleteMany({});
  await Usuario.create([
    { nombre: 'Admin Jota', email: 'admin@jota.com', password: await bcrypt.hash('admin123', 10), rol: 'admin' },
    { nombre: 'Cliente Demo', email: 'cliente@jota.com', password: await bcrypt.hash('cliente123', 10), rol: 'cliente' },
  ]);

  console.log(`Listo: ${productos.length} productos, admin@jota.com / admin123 y cliente@jota.com / cliente123`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

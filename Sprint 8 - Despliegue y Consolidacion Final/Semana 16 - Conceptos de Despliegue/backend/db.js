const mongoose = require('mongoose');

async function conectarDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Conectado a MongoDB');
}

module.exports = conectarDB;

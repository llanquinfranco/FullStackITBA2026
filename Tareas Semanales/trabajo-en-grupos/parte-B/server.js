// server.js — API de Mueblería Hermanos Jota
// PARTE B (18 minutos) — Esto NO es un ejercicio de juguete.
// Es el backend de "Mueblería Hermanos Jota". En tres semanas, el React
// de ustedes le va a pedir los datos a estas dos rutas.
//
// Completá los TODO. Los que ya están escritos son el modelo: copiá la forma.

// ============================================================
// 1. LOS REQUIRE
// ============================================================

const express = require("express");

// TODO 1: traé el catálogo desde ./productos
// Pista: ¿lleva punto o no lleva punto? ¿Es de npm, de fábrica, o nuestro?
const catalogo = ______________________;

// ============================================================
// 2. LA APLICACIÓN
// ============================================================

const app = express();
const PORT = 3000;

// ============================================================
// 3. LAS RUTAS
// ============================================================

// Esta ya está hecha. Es el modelo.
app.get("/", (req, res) => {
  res.send("API de Mueblería Hermanos Jota");
});

// ------------------------------------------------------------
// TODO 2: GET /api/productos
// Tiene que devolver el catálogo COMPLETO, en JSON.
// Esta es la ruta que va a llenar la grilla del catálogo en el front.
// ------------------------------------------------------------

app.get("______________________", (req, res) => {
  // ¿res.send o res.json? ¿Cuál de los dos etiqueta la caja?
  res.__________(__________);
});

// ------------------------------------------------------------
// TODO 3: GET /api/productos/:id
// Tiene que devolver UN producto. Esta es la que va a usar la página
// de detalle de un mueble.
// Y tiene que manejar el caso de que ese producto no exista:
// status 404 y un mensaje en JSON. Si el front pide un mueble que no
// está y vos le contestás vacío sin avisar, el front se rompe y no
// sabe por qué.
//
// ⚠️ Acordate de lo que vimos: req.params.id SIEMPRE llega como texto.
// ------------------------------------------------------------

app.get("/api/productos/:id", (req, res) => {
  // a) Convertí el id de texto a número
  const id = ______________________;

  // b) Buscá el producto en el catálogo
  //    Pista: el mismo método que usaron en el Sprint 2 para buscar
  //    un elemento dentro de un array según una condición.
  const producto = catalogo.__________((p) => __________);

  // c) Si NO lo encontró: status 404 + { error: "..." }
  //    ⚠️ No te olvides del return, o el código sigue y responde dos veces.
  if (__________) {
    return res.__________(404).json({ error: `No existe el producto con id ${id}` });
  }

  // d) Si lo encontró: devolvelo en JSON
  res.__________(__________);
});

// ============================================================
// 4. ENCENDER EL SERVIDOR
// ============================================================

// TODO 4: poné el servidor a escuchar en el PORT,
// y que imprima en la terminal la dirección donde está escuchando.
app.__________(__________, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// ============================================================
// 🎁 BONUS — solo si terminaron todo lo de arriba y les sobra tiempo
// ============================================================
//
// BONUS 1 — GET /api/productos/categoria/:categoria
//
// Tiene que devolver TODOS los productos de una categoría.
// Ejemplo: /api/productos/categoria/sillas  ->  los productos con
//          categoria === "sillas"
//
// Requisitos:
//   - Usá .filter() en vez de .find()
//   - Si no hay ninguno, devolvé 404 con un mensaje
//   - Que no importe si escriben "Sillas" o "sillas"
//
//
// BONUS 2 — GET /api/productos/destacados   ⚠️ ACÁ HAY UNA TRAMPA
//
// Tiene que devolver los productos con menos de 5 unidades de stock
// (los que hay que reponer).
//
// Escribila DEBAJO de la ruta /api/productos/:id y probala.
// No te va a andar, y el error que te da no tiene NADA que ver con
// lo que escribiste. Antes de mover nada: ¿por qué pasa eso?
//
// Cuando lo entiendas, movela y anotá la regla en una línea.

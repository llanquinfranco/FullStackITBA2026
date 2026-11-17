const express = require("express");
const router = express.Router();
const { verificarToken, soloAdmin } = require("../middleware/auth");

// 1. Importamos las funciones controladoras
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController.js");

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/", verificarToken, createProduct);

router.put("/:id", verificarToken, soloAdmin, updateProduct);

router.delete("/:id", verificarToken, soloAdmin, deleteProduct);

module.exports = router;

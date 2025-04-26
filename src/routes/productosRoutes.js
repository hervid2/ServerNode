
import express from "express";
import ProductosController from "../controllers/ProductosController.js";
import validarDatosProducto from "../middlewares/createProducto.js";

const router = express.Router();

router.get("/", ProductosController.getAllProductos);
router.get("/:id", ProductosController.getProductoById);
router.post("/", validarDatosProducto,  ProductosController.createProducto);
router.put("/:id", validarDatosProducto,  ProductosController.updateProducto);
router.patch("/:id", validarDatosProducto,  ProductosController.updateProducto);
router.delete("/:id", ProductosController.deleteProducto);

export default router;
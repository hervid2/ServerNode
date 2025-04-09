import express from "express";
import CategoriaController from '../controllers/CategoriaController.js';
import validarDatos from "../middlewares/createCategoria.js";

const router = express();

router.get('/', CategoriaController.getAllCategorias);

router.post('/', validarDatos, CategoriaController.createCategoria);

router.delete('/:id', CategoriaController.deleteCategoria);

export default router;
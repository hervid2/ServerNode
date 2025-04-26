import express from "express";
import CategoriaController from '../controllers/CategoriaController.js';
import validarDatos from "../middlewares/createCategoria.js";

const router = express.Router();

router.get('/', CategoriaController.getAllCategorias);

router.get('/:id', CategoriaController.getCategoriaById); 

router.post('/', validarDatos, CategoriaController.createCategoria);

router.put('/:id',validarDatos,CategoriaController.updateCategoria);

router.patch('/:id',validarDatos,CategoriaController.updatePartial);

router.delete('/:id', CategoriaController.deleteCategoria);

export default router;
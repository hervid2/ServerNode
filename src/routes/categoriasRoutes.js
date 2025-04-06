import express from "express";
import CategoriaController from '../controllers/CategoriaController.js';

const router = express();

router.get('/', CategoriaController.getAllCategorias);

router.post('/', CategoriaController.createCategoria);

export default router;

import Categoria from "../models/Categoria.js";

class CategoriaController {
    /**
     * Descripción larga que hable para qué me sirve este método
     * 
     * @param {object} req //Petición 
     * @param {object} res //Respuesta
     * @returns //json
     */


    // Obtener todas las categorías de la base de datos
    static async getAllCategorias(req, res) {
        // Comentarios
        const OBJCategoria = new Categoria();
        const categorias = await OBJCategoria.getAll();
        return res.json(categorias);
    }

    // Obtener una categoría por su id
    static async getCategoriaById(req, res) {
        const { id } = req.params;
        const OBJCategoria = new Categoria();
        const categoria = await OBJCategoria.getById(id);
        return res.json(categoria);
    }

    // Método crear categoría
    static async createCategoria(req, res) {
        const { nombre, descripcion } = req.body;
        const OBJCategoria = new Categoria();
        const categoria = await OBJCategoria.create(nombre, descripcion);
        return res.json(categoria);
    }

    // Método pra actualizar
    static async updateCategoria(req, res) {
        // Obtener el id
        const { id } = req.params;
        const { nombre } = req.body;
        const OBJCategoria = new Categoria();
        const data = await OBJCategoria.update(id, nombre);
        return res.json(data);
    }

    // Método pra actualizar parcial
    static async updatePartial(req, res) {
        // Obtener el id
        const { id } = req.params;
        const campos = req.body;
        const OBJCategoria = new Categoria();
        const data = await OBJCategoria.updatePartial(id, campos);
        return res.json(data);
    }

    // Método elimimar categoría
    static async deleteCategoria(req, res) {
        const { id } = req.params;
        const OBJCategoria = new Categoria();
        const categoria = await OBJCategoria.delete(id);
        return res.json(categoria);
    }
}
export default CategoriaController;

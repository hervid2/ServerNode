
import Categoria from "../models/Categoria.js";

class CategoriaController{
    
    // Obtener todas las categorías de la base de datos
    static async getAllCategorias (req, res){
        const OBJCategoria = new Categoria();
        const categorias = await OBJCategoria.getAll();
        return res.json(categorias);
    }

    // Método crear categoría
   static async createCategoria (req, res){
    const { nombre, descripcion } =  req.body;
    const OBJCategoria = new Categoria();
    const categoria =  await OBJCategoria.create(nombre,descripcion);
    return res.json(categoria);
    }
    
    // Método elimimar categoría
    static async deleteCategoria (req, res){
        const {id} = req.params.id;
        const OBJCategoria = new Categoria();
        const categoria = await OBJCategoria.delete(id);
        return res.json(categoria);
        }

}
export default CategoriaController;
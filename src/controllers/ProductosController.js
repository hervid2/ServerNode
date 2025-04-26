
import Producto from "../models/Producto.js";

class ProductosController {
    // Obtener todos los productos
    static async getAllProductos(req, res) {
        const objProducto = new Producto();
        const productos = await objProducto.getAll();
        return res.json(productos);
    }

    // Obtener producto por id
    static async getProductoById(req, res) {
        const { id } = req.params;
        const objProducto = new Producto();
        const producto = await objProducto.getById(id);
        return res.json(producto);
    }

    // Crear producto
    static async createProducto(req, res) {
        const { nombre, descripcion, precio, categoria_id } = req.body;
        const objProducto = new Producto();
        const resultado = await objProducto.create({ nombre, descripcion, precio, categoria_id });
        return res.json(resultado);
    }

    // Actualizar (PUT o PATCH) producto 
    static async updateProducto(req, res) {
        const { id } = req.params;
        const datos = req.body;
        const objProducto = new Producto();
        const resultado = await objProducto.update(id, datos);
        return res.json(resultado);
    }

    // Eliminar producto
    static async deleteProducto(req, res) {
        const { id } = req.params;
        const objProducto = new Producto();
        const resultado = await objProducto.delete(id);
        return res.json(resultado);
    }
}

export default ProductosController;
// models/Producto.js
import connection from "../utils/db.js";
import { handleResponse } from "../middlewares/responseHandler.js";

class Producto {
    async getAll() {
        try {
            const [rows] = await connection.query("SELECT * FROM productos");
            return handleResponse({ data: rows, customMessage: "Productos obtenidos con éxito" });
        } catch (error) {
            return handleResponse({ error, type: 'database', customMessage: "Error al obtener productos" });
        }
    }

    async getById(id) {
        try {
            const [rows] = await connection.query(
                "SELECT * FROM productos WHERE id = ?", [id]
            );
            if (rows.length === 0)
                return handleResponse({ type: "not_found", customMessage: "Producto no encontrado" });
            return handleResponse({ data: rows, customMessage: "Producto obtenido con éxito" });
        } catch (error) {
            return handleResponse({ error, type: "database", customMessage: "Error al obtener producto" });
        }
    }

    async create({ nombre, descripcion, precio, categoria_id }) {
        if (!nombre || !precio || !categoria_id)
            return handleResponse({ type: "validation", customMessage: "Nombre, precio y categoria_id son requeridos" });

        try {
            const [result] = await connection.query(
                "INSERT INTO productos (nombre, descripcion, precio, categoria_id) VALUES (?, ?, ?, ?)",
                [nombre, descripcion || null, precio, categoria_id]
            );
            return handleResponse({
                data: [{ id: result.insertId, nombre, descripcion, precio, categoria_id }],
                customMessage: "Producto creado con éxito"
            });
        } catch (error) {
            return handleResponse({ error, type: "database", customMessage: "Error al crear producto" });
        }
    }

    async update(id, { nombre, descripcion, precio, categoria_id }) {
        if (!nombre && !descripcion && !precio && !categoria_id)
            return handleResponse({ type: "validation", customMessage: "Se requiere al menos un campo para actualizar" });

        // Armado dinámico del query para update parcial
        let updates = [];
        let values = [];

        if (nombre) { updates.push("nombre = ?"); values.push(nombre); }
        if (descripcion) { updates.push("descripcion = ?"); values.push(descripcion); }
        if (precio) { updates.push("precio = ?"); values.push(precio); }
        if (categoria_id) { updates.push("categoria_id = ?"); values.push(categoria_id); }

        values.push(id);

        try {
            const [result] = await connection.query(
                `UPDATE productos SET ${updates.join(", ")} WHERE id = ?`, values
            );

            if (result.affectedRows === 0)
                return handleResponse({ type: "not_found", customMessage: "No se encontró el producto para actualizar" });

            return handleResponse({
                data: [{ id, nombre, descripcion, precio, categoria_id }],
                customMessage: "Producto actualizado correctamente"
            });
        } catch (error) {
            return handleResponse({ error, type: "database", customMessage: "Error al actualizar producto" });
        }
    }

    async delete(id) {
        try {
            const [result] = await connection.query("DELETE FROM productos WHERE id = ?", [id]);

            if (result.affectedRows === 0)
                return handleResponse({ type: "not_found", customMessage: "No se encontró el producto para eliminar" });

            return handleResponse({
                data: [{ id }],
                customMessage: "Producto eliminado con éxito"
            });
        } catch (error) {
            return handleResponse({ error, type: "database", customMessage: "Error al eliminar producto" });
        }
    }
}

export default Producto;
import connection from "../utils/db.js";
import { handleResponse } from "../middlewares/responseHandler.js";

class Categoria {
  constructor() {}

  async getAll() {
    try {
      const [rows] = await connection.query("select * from categorias");
      return handleResponse({ data: rows, customMessage: "Categorías obtenidas con éxito" });
    } catch (error) {
      return handleResponse({ error, type: 'database', customMessage: "Error al obtener las categorías" });
    }
  }

  async create(nombre, descripcion) {
    if (!nombre || !descripcion) {
      return handleResponse({ type: 'validation', customMessage: "Nombre y descripción son requeridos" });
    }
    try {
      const [result] = await connection.query(
        "insert into categorias (nombre,descripcion) value (?, ?)",
        [nombre, descripcion]
      );

      return handleResponse({
        data: [{ id: result.insertId, nombre, descripcion }],
        customMessage: "Categoría creada con éxito"
      });
    } catch (error) {
      return handleResponse({ error, type: 'database', customMessage: "Error al crear la categoría" });
    }
  }

  async getById(id) {
    try {
      const [rows] = await connection.query(
        "select * from categorias where id = ?",
        [id]
      );
      if (rows.length === 0) {
        return handleResponse({ type: 'not_found', customMessage: "Categoría no encontrada" });
      }
      return handleResponse({ data: rows, customMessage: "Categoría obtenida con éxito" });
    } catch (error) {
      return handleResponse({ error, type: 'database', customMessage: "Error al obtener la categoría" });
    }
  }

  async estaRelacionadaConProductos(categoria_id) {
    try {
      const [rows] = await connection.query(
        "select * from productos where categoria_id = ?",
        [categoria_id]
      );
      return handleResponse({ data: rows, customMessage: "Productos relacionados obtenidos con éxito" });
    } catch (error) {
      return handleResponse({ error, type: 'database', customMessage: "Error al verificar productos relacionados" });
    }
  }

  async update(id, nombre) {
    if (!nombre) {
      return handleResponse({ type: 'validation', customMessage: "El nombre es requerido para actualizar" });
    }
    try {
      const [result] = await connection.query(
        "update categorias set nombre = ? where id = ?",
        [nombre, id]
      );
      if (result.affectedRows === 0) {
        return handleResponse({ type: 'not_found', customMessage: "No se encontró la categoría para actualizar" });
      }
      return handleResponse({
        data: [{ id, nombre }],
        customMessage: "Categoría actualizada correctamente"
      });
    } catch (error) {
      return handleResponse({ error, type: 'database', customMessage: "Error al actualizar la categoría" });
    }
  }

  async updatePartial(id, campos) {
    if (Object.keys(campos).length === 0) {
      return handleResponse({ type: 'validation', customMessage: "Se requiere al menos un campo para actualizar" });
    }
    let query = "update categorias set ";
    let params = [];
    try {
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }
      query = query.slice(0, -2) + " where id = ?";
      params.push(id);
      
      const [result] = await connection.query(query, params);
      
      if (result.affectedRows === 0) {
        return handleResponse({ type: 'not_found', customMessage: "No se encontró la categoría para actualizar" });
      }
      return handleResponse({
        data: [{ id, ...campos }],
        customMessage: "Categoría actualizada correctamente"
      });
    } catch (error) {
      return handleResponse({ error, type: 'database', customMessage: "Error al actualizar la categoría" });
    }
  }

  async delete(id) {
    try {
      let datos = await this.getById(id);
      if (datos.error) return datos;
      
      let tieneProductos = await this.estaRelacionadaConProductos(datos.id);
      if (tieneProductos.error) return tieneProductos;
      
      if (tieneProductos.length > 0) {
        return handleResponse({ type: 'validation', customMessage: "No se puede eliminar la categoría porque tiene productos relacionados" });
      }
      
      const [result] = await connection.query(
        "delete from categorias where id = ?",
        [id]
      );
      
      if (result.affectedRows === 0) {
        return handleResponse({ type: 'not_found', customMessage: "No se pudo eliminar la categoría" });
      }
      
      return handleResponse({
        data: [datos],
        customMessage: "Categoría eliminada con éxito"
      });
    } catch (error) {
      return handleResponse({ error, type: 'database', customMessage: "Error al eliminar la categoría" });
    }
  }
}

export default Categoria;
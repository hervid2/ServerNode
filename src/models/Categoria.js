import connection from "../utils/db.js";

class Categoria {
  constructor() {}
  
  // Métodos -> listar
  async getAll() {
    try {
      const [rows] = await connection.query("select * from categorias");
      return rows;
    } catch (error) {
      return {
        error: true,
        codigo: 500,
        mensaje: "Error al obtener las categorías",
        data: []
      };
    }
  }
  
  // Métodos -> crear una categoría
  async create(nombre, descripcion) {
    try {
      const [result] = await connection.query(
        "insert into categorias (nombre,descripcion) value (?, ?)",
        [nombre, descripcion]
      );

      return {
        id: result.insertId,
        nombre,
        descripcion,
      };
    } catch (error) {
      return {
        error: true,
        codigo: 500,
        mensaje: "Error al crear la categoría",
        data: []
      };
    }
  }

  async getById(id) {
    try {
      const [rows] = await connection.query(
        "select * from categorias where id = ?",
        [id]
      );
      if (rows.length === 0) {
        return {
          error: true,
          codigo: 404,
          mensaje: "Categoría no encontrada",
          data: []
        };
      }
      return rows[0];
    } catch (error) {
      return {
        error: true,
        codigo: 500,
        mensaje: "Error al obtener la categoría",
        data: []
      };
    }
  }

  async estaRelacionadaConProductos(categoria_id) {
    try {
      const [rows] = await connection.query(
        "select * from productos where categoria_id = ?",
        [categoria_id]
      );
      return rows;
    } catch (error) {
      return {
        error: true,
        codigo: 500,
        mensaje: "Error al verificar productos relacionados",
        data: []
      };
    }
  }

  async update(id, nombre) {
    try {
      const [result] = await connection.query(
        "update categorias set nombre = ? where id = ?",
        [nombre, id]
      );
      if (result.affectedRows === 0) {
        return {
          error: true,
          codigo: 404,
          mensaje: "No se encontró la categoría para actualizar",
          data: []
        };
      }
      return {
        error: false,
        codigo: 200,
        message: "Categoría actualizada correctamente",
        data: [result]
      };
    } catch (error) {
      return {
        error: true,
        codigo: 500,
        mensaje: "Error al actualizar la categoría",
        data: []
      };
    }
  }

  async updatePartial(id, campos) {
    let query = "update categorias set ";
    let params = [];
    try {
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }
      query = query.slice(0, -2) + " where id = ?";
      params.push(id);
      
      const [] = await connection.query(query, params);
      
      if (result.affectedRows === 0) {
        return {
          error: true,
          codigo: 404,
          mensaje: "No se encontró la categoría para actualizar",
          data: []
        }; 
      }
      return {
        error: false,
        codigo: 200,
        message: "Categoría actualizada correctamente",
        data: []
      };
    } catch (error) {
      return {
        error: true,
        codigo: 500,
        mensaje: "Error al actualizar la categoría",
        data: []
      };
    }
  }

  async delete(id) {
    try {
      let datos = await this.getById(id);
      if (datos.error) return datos;
      
      let tieneProductos = await this.estaRelacionadaConProductos(datos.id);
      if (tieneProductos.error) return tieneProductos;
      
      if (tieneProductos.length > 0) {
        return {
          error: true,
          codigo: 400,
          mensaje: "No se puede eliminar la categoría porque tiene productos relacionados",
          data: []
        };
      }
      
      const [result] = await connection.query(
        "delete from categorias where id = ?",
        [id]
      );
      
      if (result.affectedRows === 0) {
        return {
          error: true,
          codigo: 404,
          mensaje: "No se pudo eliminar la categoría",
          data: []
        };
      }
      
      return {
        error: false,
        codigo: 200,
        mensaje: "Categoría eliminada con éxito",
        data: [datos]
      };
    } catch (error) {
      return {
        error: true,
        codigo: 500,
        mensaje: "Error al eliminar la categoría",
        data: []
      };
    }
  }
}

export default Categoria;
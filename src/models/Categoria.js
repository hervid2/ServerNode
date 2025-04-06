import connection  from "../utils/db.js";

class Categoria{
    constructor(){
    }
    //  Métodos -> listar
    async getAll(){
        try {
           const [rows] = await connection.query("select * from categorias");
           return rows;
        } catch (error) {
            throw new Error("Error al obtener las categorías!!!");
        }
    }
    //  Métodos -> crear una categoría
    async create(nombre, descripcion){
connection.query("insert into categorias (nombre,descripcion) value (?, ?)",
     [nombre,descripcion]);
    }
}

export default Categoria;
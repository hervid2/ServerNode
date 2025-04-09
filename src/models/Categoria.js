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
const [result] = await connection.query("insert into categorias (nombre,descripcion) value (?, ?)",
     [nombre,descripcion]);

     return{
       id: result.insertId,
        nombre,
        descripcion
    }
    } 

    async getById(id){
        try {
           cons [rows] = await connection.query("select * from categorias where id = ?",[id]);
           if (rows.length === 0) {
            throw new Error ("Categoría no encontrada");
           }
        } catch (error) {
            throw new Error("Error al obtener la categoría");
        }
    }

    estaRelacionadaConProductos(categoria_id){

    }

    async delete (id){
        let datos = await this.getById(id);
        let tieneRelacion = this.estaRelacionadaConProductos();
        console.log(datos);
        
    }
}

export default Categoria;
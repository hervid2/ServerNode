

const validarDatosProducto = (req, res, next) => {
    const { nombre, precio, categoria_id } = req.body;
  
    if (!nombre || nombre.trim() === "") {
      return res.status(400).json({ mensaje: "El nombre es obligatorio" });
    }
  
    if (precio === undefined || isNaN(precio) || Number(precio) <= 0) {
      return res.status(400).json({ mensaje: "El precio debe ser un número positivo" });
    }
  
    if (!categoria_id || isNaN(categoria_id)) {
      return res.status(400).json({ mensaje: "El ID de categoría es obligatorio y debe ser numérico" });
    }
  
    // Puedes agregar más validaciones si tu modelo crece
  
    console.log("Validación de producto exitosa!");
    next();
  };
  
  export default validarDatosProducto;
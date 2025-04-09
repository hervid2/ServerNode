const validarDatos = (req, res, next) => {
  const { nombre, descripcion } = req.body;
  if (!nombre || nombre.trim() === "") {
    return res
      .status(400)
      .json({ mensaje: "El nombre es obligatorio" });
  }
  if (!descripcion || descripcion.trim() === "") {
    return res
      .status(400)
      .json({ mensaje: "La descripción es obligatoria" });
  }
  console.log("pasó la validación!");
  next();
};

export default validarDatos;

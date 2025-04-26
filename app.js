import express from "express";
import categoriasRoutes from "./src/routes/categoriasRoutes.js";
import productosRoutes from "./src/routes/productosRoutes.js";
import bodyParser  from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

app.use('/categorias', categoriasRoutes);
app.use('/productos', productosRoutes);|

app.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
});
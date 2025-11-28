const express = require("express");
const cors = require("cors");

// conectar MySQL
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de productos
const productosRoutes = require("./routes/productos");
app.use("/api/productos", productosRoutes);

// Rutas de tipos de productos
const tiposRoutes = require("./routes/tipos");
app.use("/api/tipos", tiposRoutes);


// Iniciar servidor
app.listen(4000, () => {
  console.log("Servidor backend en http://localhost:4000");
});

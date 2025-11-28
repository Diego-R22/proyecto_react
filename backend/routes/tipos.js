const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los tipos
router.get("/", (req, res) => {
  const query = "SELECT * FROM tipo_producto";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Crear tipo
router.post("/", (req, res) => {
  const { nombre } = req.body;

  const query = "INSERT INTO tipo_producto (nombre) VALUES (?)";
  db.query(query, [nombre], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.json({
      id: result.insertId,
      nombre
    });
  });
});

// Actualizar tipo
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  const query = "UPDATE tipo_producto SET nombre = ? WHERE id = ?";
  db.query(query, [nombre, id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ id, nombre });
  });
});

// Eliminar tipo
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM tipo_producto WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "Tipo eliminado correctamente" });
  });
});

module.exports = router;

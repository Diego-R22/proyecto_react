const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const query = `
    SELECT producto.id, producto.nombre, producto.precio, tipo_producto.nombre AS tipo, tipo_producto.id AS tipo_id
    FROM producto
    INNER JOIN tipo_producto ON producto.tipo_id = tipo_producto.id
  `;
  db.query(query, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});

router.post("/", (req, res) => {
  const { nombre, precio, tipo_id } = req.body;
  const query = "INSERT INTO producto (nombre, precio, tipo_id) VALUES (?, ?, ?)";
  db.query(query, [nombre, precio, tipo_id], (err) => {
    if (err) res.status(500).send(err);
    else res.send("Producto creado");
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, precio, tipo_id } = req.body;
  const query = "UPDATE producto SET nombre=?, precio=?, tipo_id=? WHERE id=?";
  db.query(query, [nombre, precio, tipo_id, id], (err) => {
    if (err) res.status(500).send(err);
    else res.send("Producto actualizado");
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM producto WHERE id=?";
  db.query(query, [id], (err) => {
    if (err) res.status(500).send(err);
    else res.send("Producto eliminado");
  });
});

module.exports = router;
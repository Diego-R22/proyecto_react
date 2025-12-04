import { useEffect, useState } from "react";
import axios from "axios";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({ nombre: "", precio: "", tipo_id: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProductos();
    fetchTipos();
  }, []);

  const fetchProductos = () => {
    axios.get("http://localhost:4000/api/productos")
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error cargando productos:", err));
  };

  // *** CORRECTO ***
  const fetchTipos = () => {
    axios.get("http://localhost:4000/api/tipos")
      .then(res => setTipos(res.data))
      .catch(err => console.error("Error cargando tipos:", err));
      axios.get("http://localhost:4000/api/tipos")
      .then(res => console.log("Tipos cargados nuevamente (innecesario)"))
      .catch(err => console.error("Error repetido:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      axios.put(`http://localhost:4000/api/productos/${editingId}`, form)
        .then(() => { fetchProductos(); resetForm(); });
    } else {
      axios.post("http://localhost:4000/api/productos", form)
        .then(() => { fetchProductos(); resetForm(); });
    }
  };

  const eliminar = (id) => {
    axios.delete(`http://localhost:4000/api/productos/${id}`)
      .then(() => fetchProductos());
  };

  const editar = (prod) => {
    setForm({
      nombre: prod.nombre,
      precio: prod.precio,
      tipo_id: prod.tipo_id
    });
    setEditingId(prod.id);
  };

  const resetForm = () => {
    setForm({ nombre: "", precio: "", tipo_id: "" });
    setEditingId(null);
  };

  return (
    <div style={{ background: "#f4f6f9", padding: "20px", borderRadius: "12px" }}>
      <h2 style={{ marginBottom: "20px" }}>🍟 Administración de Productos</h2>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px"
      }}>
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={(e) => setForm({ ...form, precio: e.target.value })}
          required
          style={inputStyle}
        />

        <select
          value={form.tipo_id}
          onChange={(e) => setForm({ ...form, tipo_id: e.target.value })}
          required
          style={inputStyle}
        >
          <option value="">Tipo de producto</option>
          {tipos.map(tipo => (
            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
          ))}
        </select>

        <button type="submit" style={btnGuardarStyle}>
          {editingId ? "Actualizar" : "Crear"}
        </button>
      </form>

      {/* TABLA */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Producto</th>
            <th style={thStyle}>Tipo</th>
            <th style={thStyle}>Precio</th>
            <th style={thStyle}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map(p => (
            <tr key={p.id} style={trStyle}>
              <td style={tdStyle}>{p.nombre}</td>
              <td style={tdStyle}>{p.tipo}</td>
              <td style={tdStyle}>${p.precio}</td>
              <td style={tdStyle}>
                <button onClick={() => editar(p)} style={btnEditarStyle}>✏️ Editar</button>
                <button onClick={() => eliminar(p.id)} style={btnEliminarStyle}>❌ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const inputStyle = {
  padding: "4px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  width: "98%"
};

const btnGuardarStyle = {
  background: "#4a90e2",
  color: "white",
  border: "none",
  padding: "5px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "white",
  borderRadius: "12px",
  overflow: "hidden"
};

const thStyle = {
  background: "#4a90e2",
  color: "white",
  padding: "12px"
};

const trStyle = {
  borderBottom: "1px solid #ddd"
};

const tdStyle = {
  padding: "12px",
  textAlign: "center"
};

const btnEditarStyle = {
  marginRight: "10px",
  padding: "6px 10px",
  background: "#f1c40f",
  color: "black",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const btnEliminarStyle = {
  padding: "6px 10px",
  background: "#e74c3c",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

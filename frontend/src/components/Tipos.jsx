import { useEffect, useState } from "react";
import axios from "axios";

export default function Tipos() {
  const [tipos, setTipos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTipos();
  }, []);

  const fetchTipos = () => {
    axios.get("http://localhost:4000/api/tipos")
      .then(res => setTipos(res.data))
      .catch(err => console.error("Error cargando tipos:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      axios.put(`http://localhost:4000/api/tipos/${editingId}`, { nombre })
        .then(() => {
          fetchTipos();
          resetForm();
        });
    } else {
      axios.post("http://localhost:4000/api/tipos", { nombre })
        .then(() => {
          fetchTipos();
          resetForm();
        });
    }
  };

  const editar = (tipo) => {
    setNombre(tipo.nombre);
    setEditingId(tipo.id);
  };

  const eliminar = (id) => {
    axios.delete(`http://localhost:4000/api/tipos/${id}`)
      .then(() => fetchTipos());
  };

  const resetForm = () => {
    setNombre("");
    setEditingId(null);
  };

  return (
    <div style={{ background: "#f4f6f9", padding: "20px", borderRadius: "12px" }}>
      <h2>📦 Tipos de Productos</h2>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} style={{
        marginBottom: "20px",
        padding: "15px",
        background: "white",
        borderRadius: "10px"
      }}>
        <input
          placeholder="Nombre del tipo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ padding: "5px", width: "250px", borderRadius: "8px", border: "1px solid #ccc" }}
        />

        <button type="submit" style={{
          marginLeft: "10px",
          padding: "6px 12px",
          border: "none",
          background: "#4a90e2",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer"
        }}>
          {editingId ? "Actualizar" : "Crear"}
        </button>
      </form>

      {/* TABLA */}
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "white",
        borderRadius: "10px",
        overflow: "hidden"
      }}>
        <thead>
          <tr>
            <th style={{ background: "#4a90e2", color: "white", padding: "10px" }}>Nombre</th>
            <th style={{ background: "#4a90e2", color: "white", padding: "10px" }}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {tipos.map(t => (
            <tr key={t.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px", textAlign: "center" }}>{t.nombre}</td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                <button
                  onClick={() => editar(t)}
                  style={{
                    marginRight: "10px",
                    padding: "6px 10px",
                    background: "#f1c40f",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  ✏️ Editar
                </button>

                <button
                  onClick={() => eliminar(t.id)}
                  style={{
                    padding: "6px 10px",
                    background: "#e74c3c",
                    border: "none",
                    color: "white",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  ❌ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

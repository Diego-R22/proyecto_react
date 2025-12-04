import PropTypes from "prop-types";

export default function Dashboard({ view, setView, onLogout, children }) {
  return (
    <div style={{ display: "flex", height: "100vh", background: "#f4f6f9" }}>

      {/* SIDEBAR */}
      <aside style={{
        width: "240px",
        background: "#2c3e50",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        boxShadow: "3px 0px 10px rgba(0,0,0,0.2)"
      }}>

        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>🍔 Panel Admin</h2>

        <button
          style={btnSidebar(view === "dashboard")}
          onClick={() => setView("dashboard")}
        >
          🏠 Dashboard
        </button>

        <button
          style={btnSidebar(view === "productos")}
          onClick={() => setView("productos")}
        >
          🍟 Productos
        </button>

        <button
          style={btnSidebar(view === "tipos")}
          onClick={() => setView("tipos")}
        >
          📦 Tipos de Producto
        </button>

        <div style={{ flexGrow: 1 }}></div>

        <button
          style={{
            ...btnSidebar(false),
            background: "#e74c3c",
            marginTop: "auto"
          }}
          onClick={onLogout}
        >
          🔙 Cerrar Sesión
        </button>

      </aside>

      {/* CONTENIDO */}
      <main style={{
        flexGrow: 1,
        padding: "20px",
        overflowY: "auto"
      }}>
        {children}
      </main>

    </div>
  );
}


// ✅✅ ESTO ES LO QUE LE FALTABA PARA QUE SONAR NO MOLESTE
Dashboard.propTypes = {
  view: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  children: PropTypes.node
};


// ---- ESTILOS ----
const btnSidebar = (active) => ({
  width: "100%",
  padding: "12px",
  textAlign: "left",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  background: active ? "#1abc9c" : "transparent",
  color: "white",
  fontSize: "16px",
  transition: "0.3s",
  outline: "none"
});

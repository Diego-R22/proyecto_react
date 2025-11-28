import { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuario === "admin" && clave === "1234") {
      onLoginSuccess();
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f2f5",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          width: "350px",
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>🔐 Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />

          {error && (
            <p style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#4a90e2",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "#357ABD")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "#4a90e2")
            }
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

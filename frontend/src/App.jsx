import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Productos from "./components/Productos";
import Tipos from "./components/Tipos";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState("dashboard");

  const logout = () => {
    setIsLoggedIn(false);
    setView("dashboard");
  };

  return (
    <>
      {isLoggedIn === false ? (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <Dashboard view={view} setView={setView} onLogout={logout}>
          {view === "productos" ? <Productos /> : null}
          {view === "tipos" ? <Tipos /> : null}
          {view === "dashboard" ? (
            <div style={{ padding: "40px" }}>
              <h1>📊 Bienvenido al Panel</h1>
              <p>Selecciona una opción del menú izquierdo para comenzar.</p>
            </div>
          ) : null}
        </Dashboard>
      )}
    </>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Comprobar si el token existe en localStorage para verificar autenticación
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    // Eliminar el token y actualizar el estado de autenticación
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="barra">
      <div className="contenedor flex justify-between ">
        <h1>CRM - Administrador de Clientes</h1>
        <div className="botones ">
          {isAuthenticated ? (
            <button className="boton bg-slate-400" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          ) : (
            <Link to="/login" className="boton bg-slate-400">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

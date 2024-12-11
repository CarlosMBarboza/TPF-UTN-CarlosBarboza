import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      navigate(data.redirectTo || "/mis-propiedades");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="items-center mt-11">
      <div className="mt-4 mx-auto w-full max-w-lg">
        <div className="bg-white py-8 px-6 shadow rounded-lg">
      <h3 className="text-center text-2xl font-extrabold">Iniciar Sesión</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm uppercase text-gray-500 mb-2 font-bold"
              >
                Tu email
              </label>
              <input
                id="email"
                type="email"
                className="p-4 w-full border border-gray-300 rounded-lg text-lg" /* Aumentado padding y tamaño de texto */
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm uppercase text-gray-500 mb-2 font-bold"
              >
                Tu contraseña
              </label>
              <input
                id="password"
                type="password"
                className="p-4 w-full border border-gray-300 rounded-lg text-lg" /* Aumentado padding y tamaño de texto */
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Link to="/register">Registrarse</Link>
              <Link to="/olvide-password">Olvidé mi contraseña</Link>
            </div>
            <button
              type="submit"
              className="bg-cyan-600 w-full py-4 text-white uppercase font-bold rounded-lg text-lg" /* Aumentado padding y tamaño de texto */
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

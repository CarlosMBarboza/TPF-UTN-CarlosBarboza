import { Link } from 'react-router-dom';
import { useState } from 'react';
import usuarioAxios from '../../config/axios'; // Asegúrate de que la ruta sea correcta

const FormularioOlvidePassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
    };

    try {
      const response = await usuarioAxios.post('/olvide-password', userData);
      alert(response.data.message); 
    } catch (error) {
      console.log(error); 
      if (error.response) {
        alert(error.response.data.message); 
      } else {
        alert("Error al enviar la solicitud de recuperación. Intenta nuevamente."); 
      }
    }
  };

  return (
    <div className="min-h-screen">
     
      <div className="mt-4 mx-auto w-full max-w-lg"> 
        <div className="bg-white py-8 px-6 shadow rounded-lg"> 
      <h3 className="text-center text-2xl font-extrabold">Recuperar Contraseña</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4"> 
              <label
                htmlFor="email"
                className="block text-sm uppercase text-gray-500 mb-2 font-bold"
              >
                Tu email
              </label>
              <input
                id="email"
                type="email"
                className="p-4 w-full border border-gray-300 rounded-lg text-lg" 
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Link to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
              <Link to="/register">Regístrate</Link>
            </div>
            <button
              type="submit"
              className="bg-cyan-600 w-full py-4 mt-5 text-white uppercase font-bold rounded-lg text-lg" 
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioOlvidePassword;

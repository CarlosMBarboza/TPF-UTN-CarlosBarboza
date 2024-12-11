import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import usuarioAxios from '../../config/axios'; 

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== repetirPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
  
    if (name.length < 3) {
      alert("El nombre debe tener al menos 3 caracteres");
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("El correo electrónico no es válido");
      return;
    }
  
    const userData = {
      name,
      email,
      password,
      repetirPassword,
    };
  
    try {
      const response = await usuarioAxios.post('/register', userData);
      alert(response.data.message);
      navigate('/register/Creado', { state: { message: response.data.message } });
    } catch (error) {
      console.log('Error al registrar:', error.response.data);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Error al registrar el usuario. Intenta nuevamente.");
      }
    }
  };

  return (
    <div className="min-h-screen">
    
      <div className="mt-4 mb-14 mx-auto w-full max-w-lg"> 
        <div className="bg-white py-8 px-6 shadow rounded-lg"> 
      <h3 className="text-center text-2xl font-extrabold">Crear Cuenta</h3>
          <form className="space-y-4" onSubmit={handleSubmit}> 
            <div>
              <label htmlFor="nombre" className="block text-sm uppercase text-gray-500 mb-2 font-bold">
                Tu nombre
              </label>
              <input
                id="nombre"
                type="text"
                className="p-4 w-full border border-gray-300 rounded-lg text-lg" 
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm uppercase text-gray-500 mb-2 font-bold">
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
            <div>
              <label htmlFor="password" className="block text-sm uppercase text-gray-500 mb-2 font-bold">
                Tu contraseña
              </label>
              <input
                id="password"
                type="password"
                className="p-4 w-full border border-gray-300 rounded-lg text-lg" /* Aumentado padding y tamaño de texto */
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="repetirPassword" className="block text-sm uppercase text-gray-500 mb-2 font-bold">
                Repetir contraseña
              </label>
              <input
                id="repetirPassword"
                type="password"
                className="p-4 w-full border border-gray-300 rounded-lg text-lg" /* Aumentado padding y tamaño de texto */
                placeholder="Repite tu contraseña"
                value={repetirPassword}
                onChange={(e) => setRepetirPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Link to="/">Inicia sesión</Link>
              <Link to="/olvide-password">Olvidé mi contraseña</Link>
            </div>
            <button
              type="submit"
              className="bg-cyan-600 w-full py-4 text-white uppercase font-bold rounded-lg text-lg" /* Aumentado padding y tamaño de texto */
            >
              Crear Cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

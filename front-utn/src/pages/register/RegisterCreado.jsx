import { useLocation, useNavigate } from 'react-router-dom';

const RegisterCreado = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Inicializar useNavigate
  const message = location.state?.message || 'Cuenta creada con éxito';

  const handleClick = () => {
    navigate('/login'); // Redirigir al login
  };

  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-gray-100" 
      onClick={handleClick} // Manejar el clic en toda la pantalla
    >
      <div className="text-center p-24 bg-white shadow-lg rounded-lg" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-4xl font-extrabold mb-9">
          Bienes <span className="font-normal">Raices</span>
        </h1>
        <h3 className="text-2xl font-extrabold mb-9">Cuenta creada con éxito</h3>
        <p className="text-xl font-bold">{message}</p>
      <button className="bg-cyan-600 mt-12 text-white py-2 px-4 rounded-lg" onClick={handleClick}>
        Iniciar Sesión
      </button>
      </div>
    </div>
  );
};

export default RegisterCreado;

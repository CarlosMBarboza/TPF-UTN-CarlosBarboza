import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const EditarCliente = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [cliente, datosCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: ''
  });

  const consultarAPI = async () => {
    try {
      const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
      datosCliente(clienteConsulta.data);
    } catch (error) {
      console.error("Error al consultar el cliente:", error);
    }
  };

  useEffect(() => {
    consultarAPI();
  }, []); 

  const actualizarState = e => {
    datosCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  const validarCliente = () => {
    const { nombre, apellido, empresa, email, telefono } = cliente;
    return !nombre.trim() || !apellido.trim() || !empresa.trim() || !email.trim() || !telefono.trim();
  };

  const actualizarCliente = e => {
    e.preventDefault(); 
    
    clienteAxios.put(`/clientes/${cliente._id}`, cliente)
    .then(res => {
      if(res.data.code === 11000){
        Swal.fire({
          title: "Error ",
          text: "El cliente ya esta registrado",
          icon: "error"
        })
        .then(() => {
          navigate('/')
        })
      } else {
        Swal.fire({
          title:"Actualizado",
          text: "Se actualizo corectamente",
          icon: "success"
        })
        .then(() => {
          navigate('/')
        })
      }
    })
  };


  return (
    <>
      <h2 className="font-bold text-5xl mb-8">Editar Cliente</h2>
      <form onSubmit={actualizarCliente}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input 
            type="text" 
            placeholder="Nombre Cliente" 
            name="nombre"
            value={cliente.nombre} 
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input 
            type="text" 
            placeholder="Apellido Cliente" 
            name="apellido"
            value={cliente.apellido}
            onChange={actualizarState}
          />
        </div>
      
        <div className="campo">
          <label>Empresa:</label>
          <input 
            type="text" 
            placeholder="Empresa Cliente" 
            name="empresa"
            value={cliente.empresa}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input 
            type="email" 
            placeholder="Email Cliente" 
            name="email"
            value={cliente.email}
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input 
            type="tel" 
            placeholder="Teléfono Cliente" 
            name="telefono"
            value={cliente.telefono}
            onChange={actualizarState}
          />
        </div>

        <div className="enviar">
          <input 
            type="submit" 
            className="btn btn-azul" 
            value="Guardar Cambios"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </>
  );
};

export default EditarCliente;

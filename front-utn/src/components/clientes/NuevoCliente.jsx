import { useState } from "react"
import clienteAxios from "../../config/axios"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"

const NuevoCliente = () => {
  const navigate = useNavigate()
  const [cliente, guardarCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: ''
  })

  const actualizarState = e => {
    guardarCliente({
      ...cliente,
      [e.target.name]: e.target.value
    })
    console.log(cliente)
  }
 
  const agregarCliente = e => {
    e.preventDefault()

    clienteAxios.post('/clientes', cliente)
    .then (res => {
      if(res.data.code === 11000){
        Swal.fire({
          title: "Error de duplicado de Mongo",
          text: "No se puede agregar el cliente, ya existe",
          icon: "error"
        })
        .then(() => {
          navigate('/')
        })
      } else {
        Swal.fire({
          title: "Se agrego un nuevo cliente corectamente",
          text: res.data.mensaje,
          icon: "success"
        })
        .then(() => {
          navigate('/')
        })
      }

    })
  }
  const validarCliente = () => {
    const { nombre, apellido, empresa, email, telefono } = cliente
    if (nombre.trim() === '' || apellido.trim() === '' || empresa.trim() === '' || email.trim() === '' || telefono.trim() === '') {
      return true
    }
    return false
  }
  
  
  return (
    <>
    <h2 className="font-bold text-5xl mb-8">Nuevo Cliente</h2>
    <form onSubmit={agregarCliente} >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                    type="text" 
                    placeholder="Nombre Cliente" 
                    name="nombre"
                    onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input 
                    type="text" 
                    placeholder="Apellido Cliente" 
                    name="apellido"
                    onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input 
                    type="text" 
                    placeholder="Empresa Cliente" 
                    name="empresa"
                    onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input 
                    type="email" 
                    placeholder="Email Cliente" 
                    name="email"
                    onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input 
                    type="tel" 
                    placeholder="Teléfono Cliente" 
                    name="telefono"
                    onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                        <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Cliente"
                        disabled={validarCliente()}
                        />
                </div>

            </form>

    </>
  )
}

export default NuevoCliente
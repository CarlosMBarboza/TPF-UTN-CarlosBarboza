import { useState, useEffect } from "react"
import clienteAxios from "../../config/axios"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

const EditarProducto = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: '',
    imagen: ''
  })

  const [archivo, guardarArchivo] = useState('')

  const consultarAPI = async () => {
    const productoConsulta = await clienteAxios.get(`/productos/${id}`);
    guardarProducto(productoConsulta.data);
  }

  useEffect(() => {
    consultarAPI();
  }, [])

const editarProducto = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('imagen', archivo);
    try {
      await clienteAxios.put(`/productos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/productos')
    } catch (error) {
      console.error(error);
    } 
}

  const leerInformacionProducto = e => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
  }

  const leerArchivo = e => {
    guardarArchivo(e.target.files[0])
  }

  const {nombre, precio, imagen} = producto

  return (
    <>
      <h2 className="font-bold text-5xl mb-8">Editar Producto</h2>

      <form onSubmit={editarProducto} >
        <legend className="font-bold text-2xl mb-8">Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={leerInformacionProducto}
            defaultValue={nombre}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            min="0.00"
            step="1"
            placeholder="Precio"
            onChange={leerInformacionProducto}
            defaultValue={precio}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          {imagen ? (
            <img src={`http://localhost:3000/${imagen}`	} alt="imagen " width="300" />
          ) : null}
          <input
            type="file"
            name="imagen"
            onChange={leerArchivo}
            
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Editar Producto"
          />
        </div>
      </form>
    </>
  )
}

export default EditarProducto
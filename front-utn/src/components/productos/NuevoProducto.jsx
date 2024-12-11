import { useState } from "react"
import clienteAxios from "../../config/axios"
import { useNavigate } from "react-router-dom"
const NuevoProducto = () => {

  const navigate = useNavigate()

  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: 0,
  })
  const [archivo, guardarArchivo] = useState('')

  const agrgarProducto = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('imagen', archivo);

    try {
      await clienteAxios.post('/productos', formData, {
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

  return (
    <>
      <h2 className="font-bold text-5xl mb-8">Nuevo Producto</h2>

      <form onSubmit={agrgarProducto} >
        <legend className="font-bold text-2xl mb-8">Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={leerInformacionProducto}
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
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
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
            value="Agregar Producto"
          />
        </div>
      </form>
    </>
  )
}

export default NuevoProducto
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios"
import Producto from "./Producto"


const Productos = () => {
const [productos, guardarProductos] = useState([])

  useEffect(() => {
    const consultarAPI = async () => {
      const productosConsulta = await clienteAxios.get('/productos')
      guardarProductos(productosConsulta.data)
    }
    consultarAPI()
  }, [productos])
  return (
    <>
      <h2 className="font-bold text-5xl mb-8">Productos</h2>
      <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
              Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {productos.map(producto => (
                  <Producto
                    key={producto._id}
                    producto={producto}
                  />
                ))}
            </ul>
    </>
  )
}

export default Productos
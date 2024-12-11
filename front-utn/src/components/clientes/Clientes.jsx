import { useEffect, useState } from "react"
import clienteAxios from "../../config/axios"
import Cliente from "./Cliente"
import { Link } from "react-router-dom"


const Clientes = () => {
  const [clientes, guardarClientes] = useState([])

  const consultarAPI = async () => {
    const clientesConsulta = await clienteAxios.get('/clientes')
    guardarClientes(clientesConsulta.data)

  }
  useEffect(() => {
    consultarAPI()
  }, [clientes])

  return (
    <>
      <h2 className="font-bold text-5xl mb-8">Clientes</h2>

      <Link to={'/cliente/nuevo'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>

      <ul>
        {clientes.map(cliente => (
          <Cliente
            key={cliente._id}
            cliente={cliente}
          />
        ))}
      </ul>
    </>
  )
}

export default Clientes
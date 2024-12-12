import { useEffect, useState } from "react"
import clienteAxios from "../../config/axios"
import DetallesPedido from "./DetallesPedido"

const Pedidos = () => {
  const [pedidos, guardarPedidos] = useState([])


  useEffect(() => {
    const consultarAPI = async () => {
      const pedidosConsulta = await clienteAxios.get('/pedidos')
      guardarPedidos(pedidosConsulta.data)
    }
    consultarAPI()
  }, [pedidos]) 
  return (
    <>
    <h2 className="font-bold text-5xl mb-8">Pedidos</h2>
    <ul className="listado-pedidos">
                {
                    pedidos.map(pedido => (
                        <DetallesPedido
                            key={pedido._id}
                            pedido={pedido}
                        />
                    ))
                }
            </ul>
    </>
  )
}

export default Pedidos
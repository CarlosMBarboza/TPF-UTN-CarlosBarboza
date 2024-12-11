import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import clienteAxios from "../../config/axios"


const Cliente = ({ cliente }) => {

  const { _id, nombre, empresa, email, telefono } = cliente
  const eliminarCliente = () => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!",
      cancelButtonText: "Cancelar!"
    }).then((result) => {
      if (result.isConfirmed) {
        clienteAxios.delete(`/clientes/${_id}`).then(res => {
          Swal.fire(
            "Eliminado!",
            res.data.mensaje,
            "success"
          )
        })
      }
    });
  }
  return (
    <>
      <li className="cliente">
        <div className="info-cliente">
          <p className="nombre">{nombre}</p>
          <p className="empresa">{empresa}</p>
          <p>{email}</p>
          <p>Tel: {telefono}</p>
        </div>
        <div className="acciones">
          <Link to={`/cliente/editar/${_id}`} className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Cliente
          </Link>
          <button
            type="button"
            className="btn btn-rojo btn-eliminar"
            onClick={() => eliminarCliente(_id)}
          >

            <i className="fas fa-times"></i>
            Eliminar Cliente
          </button>
        </div>
      </li>

    </>
  )
}

export default Cliente
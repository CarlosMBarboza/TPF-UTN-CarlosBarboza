import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const Producto = ({producto}) => {

  const {_id,nombre, precio, imagen} = producto;

  const eliminarProducto = id => {
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
        clienteAxios.delete(`/productos/${id}`).then(res => {
          if(res.data.resultado === 200){
            
            Swal.fire(
              "Eliminado!",
              res.data.mensaje,
              "success"
            )
          }
        })
      }
    });
  }
  
  return (
    <div>

<li className="producto">
                    <div className="info-producto">
                        <p className="nombre">{nombre}</p>
                        <p className="precio">{precio} </p>
                        { imagen ?
                          (<img src={`http://localhost:3000/${imagen}`} alt="imagen"/>
                          ): null }
                    </div>
                    <div className="acciones">
                        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Producto
                        </Link>

                        <button 
                        type="button" 
                        className="btn btn-rojo btn-eliminar"
                        onClick={()=> eliminarProducto(_id)}
                        >
                            <i className="fas fa-times"></i>
                            Eliminar Producto
                        </button>
                    </div>
                </li>
    </div>
  )
}

export default Producto

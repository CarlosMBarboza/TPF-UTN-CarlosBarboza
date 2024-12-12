import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const DetallesPedido = ({ pedido, actualizarPedidos }) => {

  if (!pedido) {
    return <p>No hay detalles del pedido disponibles.</p>;
  }

  const { cliente, productos, total, _id } = pedido;

  // Función para eliminar un pedido
  const eliminarPedido = async (idPedido) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const respuesta = await clienteAxios.delete(`/pedidos/${idPedido}`);
          console.log("Respuesta del servidor:", respuesta.data);
          Swal.fire("Eliminado", "El pedido ha sido eliminado", "success");
  
          // Actualizar la lista de pedidos
          if (actualizarPedidos) {
            actualizarPedidos();
          }
        } catch (error) {
          console.error("Error al eliminar pedido:", error.response || error);
          Swal.fire("Error", "No se pudo eliminar el pedido", "error");
        }
      }
    });
  };
  

  return (
    <li className="pedido">
      <div className="info-pedido">
        <p className="id">ID: {_id || "ID no disponible"}</p>
        <p className="nombre">
          Cliente:{" "}
          {cliente
            ? `${cliente.nombre} ${cliente.apellido}`
            : "Información del cliente no disponible"}
        </p>

        <div className="articulos-pedido">
          <p className="productos">Artículos del Pedido:</p>
          <ul>
            {productos && productos.length > 0 ? (
              productos.map((producto) => (
                <li key={producto._id}>
                  <p>{producto.nombre || "Nombre no disponible"}</p>
                  <p>Precio: ${producto.precio || 0}</p>
                  <p>Cantidad: {producto.cantidad || 0}</p>
                </li>
              ))
            ) : (
              <p>No hay productos en este pedido.</p>
            )}
          </ul>
        </div>
        <p className="total">Total: ${total || 0}</p>
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarPedido(_id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Pedido
        </button>
      </div>
    </li>
  );
};

export default DetallesPedido;

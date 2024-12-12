import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import FormBuscarProducto from "./FormBuscarProducto";
import FormCantidaProducto from "./FormCantidaProducto";
import Swal from "sweetalert2";

const NuevoPedido = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [cliente, guardarCliente] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    empresa: "",
    email: "",
  });

  const [busqueda, guardarBusqueda] = useState("");
  const [productos, guardarProductos] = useState([]);
  const [total, guardarTotal] = useState(0);

  // Obtener datos del cliente
  useEffect(() => {
    const consultarAPI = async () => {
      try {
        const resultado = await clienteAxios.get(`/clientes/${id}`);
        guardarCliente(resultado.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar los datos del cliente",
        });
      }
    };
    consultarAPI();
  }, [id]);

  // Actualizar el total automáticamente cuando cambien los productos
  useEffect(() => {
    calcularTotal();
  }, [productos]);

  // Buscar producto por su nombre o código
  const buscarProducto = async (e) => {
    e.preventDefault();
    try {
      const resultadoBusqueda = await clienteAxios.post(
        `/productos/busqueda/${busqueda}`
      );

      if (resultadoBusqueda.data[0]) {
        const productoResultado = {
          ...resultadoBusqueda.data[0],
          producto: resultadoBusqueda.data[0]._id,
          cantidad: 0,
        };

        guardarProductos([...productos, productoResultado]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se encontró el producto",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al buscar el producto",
      });
    }
  };

  // Modificar cantidad de productos
  const restarProductos = (index) => {
    const copiaProductos = [...productos];
    if (copiaProductos[index].cantidad > 0) {
      copiaProductos[index].cantidad--;
      guardarProductos(copiaProductos);
    }
  };

  const aumentarProductos = (index) => {
    const copiaProductos = [...productos];
    copiaProductos[index].cantidad++;
    guardarProductos(copiaProductos);
  };

  const eliminarProducto = (id) => {
    const productosFiltrados = productos.filter(
      (producto) => producto.producto !== id
    );
    guardarProductos(productosFiltrados);
  };

  // Calcular el total del pedido
  const calcularTotal = () => {
    const totalCalculado = productos.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
    guardarTotal(totalCalculado);
  };

  // Enviar pedido al servidor
  const enviarPedido = async (e) => {
    e.preventDefault();
  
    const pedido = {
      cliente: id, // ID del cliente obtenido desde useParams
      pedido: productos,
      total,
    };
  
    try {
      const resultado = await clienteAxios.post(`/pedidos/${id}`, pedido);
  
      if (resultado.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Pedido creado",
          text: "El pedido se creó correctamente",
        });
  
        navigate("/pedidos");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al crear el pedido",
      });
    }
  };
  

  return (
    <>
      <h2 className="font-bold text-5xl mb-8">Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3 className="font-bold text-4xl mb-4">Datos de Cliente</h3>
        <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
        <p>Teléfono: {cliente.telefono}</p>
        <p>Empresa: {cliente.empresa}</p>
        <p>Email: {cliente.email}</p>
      </div>

      <FormBuscarProducto
        buscarProducto={buscarProducto}
        leerDatosBusqueda={(e) => guardarBusqueda(e.target.value)}
      />

      <ul className="resumen">
        {productos.map((producto, index) => (
          <FormCantidaProducto
            key={producto.producto}
            producto={producto}
            index={index}
            restarProductos={restarProductos}
            aumentarProductos={aumentarProductos}
            eliminarProducto={eliminarProducto}
          />
        ))}
      </ul>

      <p className="total">
        Total a Pagar: <span>${total.toFixed(2)}</span>
      </p>

      {total > 0 && (
        <form onSubmit={enviarPedido}>
          <input 
            type="submit"
            value="Crear Pedido"
            className="btn btn-azul btn-block"
          />
        </form>
      )}
    </>
  );
};

export default NuevoPedido;

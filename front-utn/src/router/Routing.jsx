import { Routes, Route } from "react-router-dom";
import Clientes from "../components/clientes/Clientes";
import NuevoCliente from "../components/clientes/NuevoCliente";
import EditarCliente from "../components/clientes/EditarCliente";
import Productos from "../components/productos/Productos";
import EditarProducto from "../components/productos/EditarProducto";
import NuevoProducto from "../components/productos/NuevoProducto";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import RegisterCreado from "../pages/register/RegisterCreado";
import OlvidePassword from "../pages/password/OlvidePassword";
import Pedidos from "../components/pedidos/Pedidos";
import NuevoPedido from "../components/pedidos/NuevoPedido";


const Routing = () => {
  return (
    <>
      <Routes> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/olvide-password" element={<OlvidePassword />} />
        <Route path="/register/Creado" element={<RegisterCreado />} />

        
        <Route path="/" element={<Clientes/>} />
        <Route path="/cliente/nuevo" element={<NuevoCliente/>} />
        <Route path="/cliente/editar/:id" element={<EditarCliente />} />

        <Route path="/productos" element={<Productos/>} />
        <Route path="/productos/nuevo" element={<NuevoProducto />} />
        <Route path="/productos/editar/:id" element={<EditarProducto />} />
        
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/pedidos/nuevo/:id" element={<NuevoPedido />} />
      </Routes>
    </>
  )
}

export default Routing
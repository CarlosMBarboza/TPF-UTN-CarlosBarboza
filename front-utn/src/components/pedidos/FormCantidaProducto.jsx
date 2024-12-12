

const FormCantidaProducto = (props) => {
  const {producto, restarProductos, aumentarProductos,eliminarProducto, index} = props

  return (
    <>
      <li>
        <div className="texto-producto">
          <p className="nombre">{producto.nombre}</p>
          <p className="precio">$ {producto.precio}</p>
        </div>
        <div className="acciones">
          <div className="contenedor-cantidad">

            <i 
            onClick={() => restarProductos(index)}  
            className="fas fa-minus"
            ></i>

            <p>{producto.cantidad} </p>

            <i 
            onClick={() => aumentarProductos(index)} 
            className="fas fa-plus"
            ></i>
          </div>
          <button 
          type="button" 
          onClick={() => eliminarProducto(producto.producto)} 
          className="btn btn-rojo">
            <i className="fas fa-minus-circle"></i>   
            Eliminar Producto
          </button>
        </div>
      </li>
    </>
  )
}

export default FormCantidaProducto

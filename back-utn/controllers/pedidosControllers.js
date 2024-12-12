const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async (req, res, next) => {
  const { idCliente } = req.params;
  const pedido = new Pedidos({
    ...req.body,
    cliente: idCliente, // Relacionar el pedido con el cliente
  });

  try {
    await pedido.save();
    res.json({ mensaje: 'Pedido creado correctamente' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


exports.mostrarPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedidos.find({})
      .populate('cliente')
      .populate({
        path: 'pedido.producto',
        model: 'Productos',
      });
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    next(error); // Pasar el error al middleware global
  }
};

exports.mostrarUnPedido = async (req, res, next) => {
  const { idPedido } = req.params;

  try {
    const pedido = await Pedidos.findById(idPedido);

    if (!pedido) {
      const error = new Error('Pedido no encontrado');
      error.status = 404; // Código HTTP 404 para "No encontrado"
      return next(error); // Pasar el error al middleware global
    }

    res.json(pedido);
  } catch (error) {
    console.error(error);
    next(error); // Pasar el error al middleware global
  }
};

exports.actualizarPedido = async (req, res, next) => {
  const { idPedido } = req.params;
  const nuevoPedido = req.body;

  try {
    let pedido = await Pedidos.findById(idPedido);
    if (!pedido) {
      const error = new Error('Pedido no encontrado');
      error.status = 404;
      return next(error);
    }

    pedido = await Pedidos.findOneAndUpdate(
      { _id: idPedido },
      nuevoPedido,
      { new: true }
    );
    res.json(pedido);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.eliminarPedido = async (req, res, next) => {
  const { idPedido } = req.params;
  console.log("Intentando eliminar pedido con ID:", idPedido);

  try {
    const pedido = await Pedidos.findById(idPedido);
    if (!pedido) {
      console.log("Pedido no encontrado");
      const error = new Error("Pedido no encontrado");
      error.status = 404;
      return next(error);
    }

    await Pedidos.findOneAndDelete({ _id: idPedido });
    console.log("Pedido eliminado correctamente");
    res.json({ mensaje: "Pedido eliminado" });
  } catch (error) {
    console.error("Error al eliminar el pedido:", error);
    next(error);
  }
};


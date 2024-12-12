const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidoSchema = new Schema({
  cliente: {
    type: Schema.ObjectId,
    ref: 'Clientes',
    required: true,
  },
  pedido: [
    {
      producto: {
        type: Schema.ObjectId,
        ref: 'Productos',
      },
      cantidad: Number,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Pedidos', PedidoSchema);

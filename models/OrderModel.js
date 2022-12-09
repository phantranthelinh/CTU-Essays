const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderDetails:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderDetail", 
    }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

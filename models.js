const mongoose = require("mongoose");

const OrderShema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Order = mongoose.model("Order", OrderShema);

module.exports = Order;

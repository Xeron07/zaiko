/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  p_id: String,
  name: String,
  cat_id: { type: String, default: "" },
  amount: { type: Number, default: 0 },
  unit_price: { type: Number, default: 0.0 },
});

module.exports = mongoose.model("products", productSchema);

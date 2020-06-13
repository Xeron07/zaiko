/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  cat_id: String,
  name: String,
  type: String,
  cutting_price: { type: Number, default: 0.0 },
  tex: { type: Number, default: 0.0 },
});

module.exports = mongoose.model("categories", categorySchema);

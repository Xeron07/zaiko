/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema({
  e_id: String, //expense id
  type: { type: String, default: "Default" },
  price: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  details: String,
});

module.exports = mongoose.model("expenses", expenseSchema);

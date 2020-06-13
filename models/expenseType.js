/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema({
  eType: String, //expense id
  price: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  name: String,
});

module.exports = mongoose.model("expensesType", expenseSchema);

/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const historySchema = new Schema({
  tr_id: String, //unique id
  date: { type: Number, default: new Date().getDate() },
  month: { type: Number, default: new Date().getMonth() },
  year: { type: Number, default: new Date().getFullYear() },
  profit: { type: Number, default: 0.0 }, //profit of that day

  //total sell of that day
  sells: {
    total: { type: Number, default: 0 },
    amount: { type: Number, default: 0.0 },
  },
  //total purchase of that day
  purchases: {
    total: { type: Number, default: 0 },
    amount: { type: Number, default: 0.0 },
  },
  //total expense of that day
  expenses: {
    total: { type: Number, default: 0 },
    amount: { type: Number, default: 0.0 },
  },
});
module.exports = mongoose.model("histories", historySchema);

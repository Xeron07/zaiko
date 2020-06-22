/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const purchaseSchema = new Schema({
  pur_id: String, //purchase id
  eid: String, //expense id
  tId: String,
  status: { type: Boolean, default: true },
  clientId: String,
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("purchase", purchaseSchema);

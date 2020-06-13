/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema({
  cid: String, //client id
  name: String, //client name
  email: String,
  pn: String,
  address: String,
  city: { type: String, default: "chittagong" },
  zip: { type: Number, default: 0 },
  t_id: [],
});

module.exports = mongoose.model("clients", clientSchema);

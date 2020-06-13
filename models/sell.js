/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const sellSchema = new Schema({
  s_id: String, //sell id
  eid: String, //expense id
  transection: String,
  status: String,
  client: String,
});

module.exports = mongoose.model("sell", sellSchema);

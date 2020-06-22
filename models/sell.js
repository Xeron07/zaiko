/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const sellSchema = new Schema({
  s_id: String, //sell id
  eid: String, //expense id
  tId: String,
  status: { type: Boolean, default: true },
  clientId: String,
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("sell", sellSchema);

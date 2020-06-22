/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const costSchema = new Schema({
  time: { type: Date, default: Date.now },
  costId: String, //cost id
  bankCharge: { type: Number, default: 0.0 },
  dep: { type: Number, default: 0.0 },
  rent: { type: Number, default: 0.0 },
  utility: { type: Number, default: 0.0 },
  saving: { type: Number, default: 0.0 },
  extra: { type: Number, default: 0.0 },
  share: { type: Number, default: 0.0 },
});

module.exports = mongoose.model("cost", costSchema);

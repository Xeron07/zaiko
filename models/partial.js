/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const partialSchema = new Schema({
  par_id: String, //sell id
  tId: { type: String, default: "no" },
  status: { type: Boolean, default: false },
  clientId: String,
  amount: {
    total: { type: Number, default: 0.0 },
    paid: { type: Number, default: 0.0 },
    due: { type: Number, default: 0.0 },
  },
  history: [
    {
      date: { type: Date, default: Date.now },
      paid: { type: Number, default: 0.0 },
      due: { type: Number, default: 0.0 },
    },
  ],
});

module.exports = mongoose.model("partial", partialSchema);

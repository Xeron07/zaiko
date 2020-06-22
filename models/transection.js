/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const transectionSchema = new Schema({
  t_id: String, //transection id
  time: { type: Date, default: Date.now }, //transection timestamp
  type: String, //transectiontype
  cid: String, //client id
  eid: String,
  typeId: String,
  products: { type: Array, default: [] },
  amount: {
    totalAmount: { type: Number, default: 0.0 },
    totalItems: { type: Number, default: 0 },
    onlyPrice: { type: Number, default: 0.0 },
    discount: { type: Number, default: 0.0 },
  },
  payment: {
    paid: { type: Number, default: 0.0 },
    due: { type: Number, default: 0.0 },
  },
  partial: {
    active: { type: Boolean, default: false }, //partial payment exist or not
    id: String,
  },
});

module.exports = mongoose.model("transections", transectionSchema);

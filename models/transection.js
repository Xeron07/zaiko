/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const transectionSchema = new Schema({
  t_id: String, //transection id
  time: { type: Date, default: Date.now }, //transection timestamp
  type: String, //transectiontype
  cid: String, //client id
  delivery_charge: {
    active: { type: Boolean, default: false },
    fee: { type: Number, default: 0.0 },
  },
  product: {
    p_id: String, //product id
    quantity: { type: Number, default: 0 }, //quantity sold
    remaining: { type: Number, default: 0 }, //remaining after sold
  },
  payment: {
    paid: { type: Number, default: 0.0 }, //total paid
    unitPrice: { type: Number, default: 0.0 }, //product Unit price
    amount: { type: Number, default: 0.0 }, //total calculated price
    only_price: { type: Number, default: 0.0 }, //total price with out expense
    discount: { type: Number, default: 0.0 }, //discount
    quantity: { type: Number, default: 0 }, //quantity sold
    e_id: String, //expense id
  },
  partial: {
    active: { type: Boolean, default: false }, //partial payment exist or not
    paid: { type: Number, default: 0.0 }, // paid amount
    due: { type: Number, default: 0.0 }, //due amount
    //keeping the partial payment history
    history: [
      {
        date: { type: Date, default: Date.now }, //payment date
        paid: { type: Number, default: 0.0 }, //pid amount
        due: { type: Number, default: 0.0 }, //remaining due after payment
      },
    ],
  },
});

module.exports = mongoose.model("transections", transectionSchema);

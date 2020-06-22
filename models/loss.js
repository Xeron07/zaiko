/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const lossSchema = new Schema({
  time: { type: Date, default: Date.now },
  lossId: String, //loss id
  pid: String,
  quantity: { type: Number, default: 0 },
  amount: { type: Number, default: 0.0 },
});

module.exports = mongoose.model("loss", lossSchema);
/**
 *  {
      $match: {
        type: "sell",
      },
    },
 */
/**
 * {
      $lookup: {
        from: "losses",
        let: { month: { $month: "$time" }, year: "$time" },
        pipeline: [
          {
            $group: {
              _id: { month: { $month: "$time" }, year: { $year: "$time" } },
              loss: { $sum: "$amount" },
            },
          },
          {
            $match: {
              $expr: { $eq: ["$$month", "$_id.month"] },
            },
          },
        ],
        as: "loss",
      },
    },
 */

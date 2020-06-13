/** @format */

const router = require("express").Router();
const mongoose = require("mongoose");
const stock = require("../../models/product");
const transections = require("../../models/transection");
const sell = require("../../models/expense");
const pur = require("../../models/product");
const clientData = require("../../models/client");

const start = new Date();
start.setHours(0, 0, 0, 0);

const end = new Date();
end.setHours(23, 59, 59, 999);
const sellPipeline = [
  {
    $match: {
      time: { $gte: start, $lt: end },
      type: "sell",
    },
  },
  {
    $project: {
      totalAmount: { $add: "$payment.amount" },
      recieved: { $add: "$payment.paid" },
      due: { $add: "$partial.due" },
    },
  },
];
const purchasePipeline = [
  {
    $match: {
      time: { $gte: start, $lt: end },
      type: "purchase",
    },
  },
  {
    $project: {
      totalAmount: { $add: "$payment.amount" },
      paid: { $add: "$payment.paid" },
      due: { $add: "$partial.due" },
    },
  },
];

const totalStock = [
  {
    $project: {
      totalFish: { $add: "$amount" },
      totalStock: { $add: { $multiply: ["$amount", "$unit_price"] } },
    },
  },
];

router.get("/all", async (req, res) => {
  const sellData = await transections.aggregate(sellPipeline);
  const purchaseData = await transections.aggregate(purchasePipeline);
  const stockData = await stock.aggregate(totalStock);
  const fishTypes = await stock.countDocuments();
  const totalSelled = await transections
    .find({})
    .where({ time: { $gte: start, $lt: end }, type: "sell" });
  const totalPurchased = await transections
    .find({})
    .where({ time: { $gte: start, $lt: end }, type: "purchase" });

  const profit = sellData[0]
    ? sellData[0].recieved
    : 0 - purchaseData[0]
    ? purchaseData[0].paid
    : 0;
  res.json({
    sellData: sellData[0] ? sellData[0] : null,
    purchaseData: purchaseData[0] ? purchaseData[0] : null,
    totalSelled,
    totalPurchased,
    profit,
    stockData,
    fishTypes,
  });
});

router.get("/all/monthly", async (req, res) => {
  const sellData = await transections.aggregate(sellPipeline);
  const purchaseData = await transections.aggregate(purchasePipeline);
  const stockData = await stock.aggregate(totalStock);
  const fishTypes = await stock.countDocuments();
  const totalSelled = await transections
    .find({})
    .where({ time: { $gte: start, $lt: end }, type: "sell" });
  const totalPurchased = await transections
    .find({})
    .where({ time: { $gte: start, $lt: end }, type: "purchase" });

  const profit = sellData[0]
    ? sellData[0].recieved
    : 0 - purchaseData[0]
    ? purchaseData[0].paid
    : 0;
  res.json({
    sellData: sellData[0] ? sellData[0] : null,
    purchaseData: purchaseData[0] ? purchaseData[0] : null,
    totalSelled,
    totalPurchased,
    profit,
    stockData,
    fishTypes,
  });
});

router.get("/:id", async (req, res) => {
  const data = await transections.findOne({ t_id: req.params.id });
  data ? res.json({ data }) : res.json({ data: false });
});

router.get("/product/all", async (req, res) => {
  const data = await transections.find({});
  data ? res.json({ data }) : res.json({ data: false });
});

router.get("/details", async (req, res) => {
  const data = transections.find({}).where();
  data ? res.json({ data }) : res.json({ data: [] });
});

module.exports = router;

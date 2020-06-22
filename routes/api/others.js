/** @format */

const router = require("express").Router();
const mongoose = require("mongoose");
const tdata = require("../../models/transection");
const sell = require("../../models/sell");
const pur = require("../../models/purchase");
const par = require("../../models/partial");
const clientData = require("../../models/client");
const costModel = require("../../models/monthCost");

router.post("/add", async (req, res) => {
  const cost = new costModel({ ...req.body, costId: "u-127" });
  const data = await cost.save();
  res.json({ data });
});

router.get("/get", async (req, res) => {
  const data = await costModel.findOne({ costId: "u-127" });
  res.json(data);
});

router.post("/update", async (req, res) => {
  let data = await costModel.updateOne({ costId: "u-127" }, { ...req.body });

  res.json(data);
});

module.exports = router;

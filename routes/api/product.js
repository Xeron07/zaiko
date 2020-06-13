/** @format */

const router = require("express").Router();
const mongoose = require("mongoose");
const tdata = require("../../models/transection");
const productData = require("../../models/product");
const { productValidation } = require("./validation");

router.get("/all", async (req, res) => {
  try {
    const data = await productData.find({});
    if (data) {
      res.json({ data, err: "no" });
    } else {
      res.json({ err: "No data Found" });
    }
  } catch (e) {
    console.error(e);
    res.json({ err: "No data Found" });
  }
});

router.get("/single/:id", async (req, res) => {
  console.log(req.params.id);
  const data = await productData.findOne({ p_id: req.params.id });
  if (data) {
    res.json({ data, err: false });
  } else {
    res.status(400).json({
      err: true,
    });
  }
});

router.post("/add", async (req, res) => {
  console.log("postin");
  const info = req.body;
  console.log(info);
  const result = productValidation(info);
  let product = new productData({
    p_id: Date.now(),
    name: info.name,
    amount: info.amount,
    unit_price: info.unitPrice,
  }).save();

  res.json({ product, res: "success" });
});

router.post("/update", async (req, res) => {
  const info = req.body.product;
  const data = await productData.findOne({ p_id: req.body.pid });
  console.log(data);
  if (data) {
    data.amount = info.amount;
    data.name = info.name;
    data.unit_price = info.unitPrice;
    data.save();
    res.json({ data, res: "success" });
  }
});

router.post("/delete/:id", async (req, res) => {
  const info = req.params.id;
  const data = await productData.deleteOne({ p_id: info });
  data == 1 ? res.json({ res: "success" }) : res.json({ res: "error" });
});

module.exports = router;

// const router = require("express").Router();
// const mongoose = require("mongoose");
// const tdata=require("../../models/transection");
// const productData=require("../../models/product");

// module.exports = router;

/** @format */

const router = require("express").Router();
const mongoose = require("mongoose");
const tdata = require("../../models/transection");
const sell = require("../../models/sell");
const pur = require("../../models/purchase");
const par = require("../../models/partial");
const clientData = require("../../models/client");

const { clientValidation } = require("./validation");

router.get("/all", async (req, res) => {
  const data = await clientData.find({});
  data ? res.json({ data }) : res.json({ data: [] });
});

router.get("/user/:id", async (req, res) => {
  const data = await clientData.findOne({ cid: req.params.id });
  if (data) {
    const trData = await tdata.findOne({ cid: data.cid });
    if (trData) res.json({ client: data, transections: trData, status: true });
  }
  res.json({ status: false });
});

router.post("/delete/:id", async (req, res) => {
  const data = await clientData.deleteOne({ cid: req.params.id });
  data ? res.json({ data }) : res.json({ data: [] });
});

router.post("/get/:pn", async (req, res) => {
  const data = await clientData.find({
    pn: { $regex: ".*" + req.params.pn + ".*" },
  });
  console.log(data);
  data ? res.json({ data }) : res.json({ data: [] });
});

router.post("/add", async (req, res) => {
  const val = req.body;
  console.log(req.body);
  const data = new clientData({
    cid: Date.now(),
    name: val.name,
    email: val.email,
    pn: val.pn,
    address: val.address,
    city: val.city ? val.city : "Chittagong",
    zip: val.zip ? val.zip : "1234",
  });
  let ret = await data.save();

  res.json({ err: false, cl: ret });
});

router.get("/details/:id", async (req, res) => {
  const c_id = req.params.id;
  const clientInfo = await clientData.findOne({ cid: c_id });
  const transections = await tdata.find({ cid: c_id });
  const partials = await par.find({ clientId: c_id }).where({ status: true });
  const payment = await tdata.aggregate([
    {
      $match: { cid: c_id },
    },
    {
      $group: {
        _id: null,
        amount: { $sum: "$amount.totalAmount" },
        due: { $sum: "$payment.due" },
        paid: { $sum: "$payment.paid" },
      },
    },
  ]);
  console.log(payment);
  res.json({ clientInfo, payment: payment[0], transections, partials });
});

router.post("/update", async (req, res) => {
  const { cid, name, pn, email, address, city, zip } = req.body;

  const data = await clientData.findOne({ cid: cid });

  if (data) {
    data.name = name;
    data.pn = pn;
    data.email = email;
    data.address = address;
    data.city = city;
    data.zip = zip;
    await data.save();
  }
  res.json({ err: false });
});

module.exports = router;

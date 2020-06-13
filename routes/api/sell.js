/** @format */
const router = require("express").Router();
const mongoose = require("mongoose");
const tdata = require("../../models/transection");
const sell = require("../../models/sell");
const pur = require("../../models/purchase");
const productSchema = require("../../models/product");
const clientData = require("../../models/client");
const expense = require("../../models/expense");

router.get("/time", async (req, res) => {
  var start = new Date();
  start.setHours(0, 0, 0, 0);

  var end = new Date();
  end.setHours(23, 59, 59, 999);
  var pipeline = [
    {
      $match: {
        time: { $gte: start, $lt: end },
      },
    },
  ];
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let data = await tdata.aggregate(pipeline);
  res.json({ data });
});

router.get("/all", async (req, res) => {
  const data = await clientData.find({});
  data ? res.json({ data }) : res.json({ data: [] });
});

router.get("/delete/:id", async (req, res) => {
  const data = await clientData.find({});
  data ? res.json({ data }) : res.json({ data: [] });
});

// router.post("/add", async (req, res) => {
//   const data = await clientData.find({});
//   data ? res.json({ data }) : res.json({ data: [] });
// });

//sell data adding
router.post("/add", async (req, res) => {
  const data = req.body;
  let cid = "";
  let eid = 0;
  let error = [];

  //expense check
  if (data.expenseData.price != 0) {
    let r = await addExpense(data.expenseData);
    eid = r.eData;
  }
  //client check
  !data.clientUI.old
    ? (cid = await addClient(data.clientInfo))
    : (cid = data.clientInfo.cid);

  let result = await addTransection(cid, data, eid, "sell");

  if (result) {
    let product = await productSchema.findOne({ p_id: data.productData.p_id });
    product.amount -= data.productData.quantity;
    await product.save();
  }

  result
    ? res.json({ status: true, data })
    : res.json({ status: false, data: [] });
});

//purchase data adding
router.post("/purchase/add", async (req, res) => {
  const data = req.body;
  let cid = "";
  let eid = 0;
  let error = [];

  //expense check
  if (data.expenseData.price != 0) {
    let r = await addExpense(data.expenseData);
    eid = r.eData;
  }
  //client check
  !data.clientUI.old
    ? (cid = addClient(data.clientInfo))
    : (cid = data.clientInfo.cid);

  let result = await addTransection(cid, data, eid, "purchase");

  if (result) {
    let product = await productSchema.findOne({ p_id: data.productData.p_id });
    product.amount += data.productData.quantity;
    await product.save();
  }

  result
    ? res.json({ status: true, data })
    : res.json({ status: false, data: [] });
});

//adding new expense
let addExpense = async (data) => {
  const { price, details } = data;
  const val = new expense({
    e_id: Date.now(),
    price,
    details,
  });
  let result = await val.save();
  return result ? { eData: val.e_id } : { e_id: 0 };
};

//adding new client
let addClient = async (data) => {
  const val = data;
  const dc = new clientData({
    cid: Date.now(),
    name: val.name,
    email: val.email,
    pn: val.pn,
    address: val.address,
    city: val.city,
    zip: val.zip,
  });
  let ret = await dc.save();
  return ret ? dc.cid : 0;
};

//adding tracsection
let addTransection = async (funCid, data, funEid, tType) => {
  let info = new tdata({
    t_id: Date.now(), //transection id
    //transection timestamp
    type: tType, //transectiontype
    cid: funCid, //client id
    delivery_charge: data.delivery_charge,
    product: {
      p_id: data.productData.p_id, //product id
      quantity: data.productData.quantity, //quantity sold
      remaining: data.productData.remaining, //remaining after sold
    },
    payment: {
      paid: data.paymentData.paid, //total paid
      unitPrice: data.paymentData.unitPrice, //product Unit price
      amount: data.paymentData.amount, //total calculated price
      only_price: data.paymentData.only_price, //total price with out expense
      discount: data.paymentData.discount, //discount
      quantity: data.paymentData.quantity, //quantity sold
      e_id: funEid, //expense id
    },
    partial: {
      active: data.partialData.active, //partial payment exist or not
      paid: data.partialData.paid, // paid amount
      due: data.partialData.due, //due amount
      //keeping the partial payment history
      history: [
        {
          date: new Date(), //payment date
          paid: data.partialData.paid, //pid amount
          due: data.partialData.due, //remaining due after payment
        },
      ],
    },
  });

  let d = await info.save();

  return d ? true : false;
};

module.exports = router;

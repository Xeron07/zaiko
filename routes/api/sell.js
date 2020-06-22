/** @format */
const router = require("express").Router();
const mongoose = require("mongoose");
const tdata = require("../../models/transection");
const sell = require("../../models/sell");
const pur = require("../../models/purchase");
const productSchema = require("../../models/product");
const clientData = require("../../models/client");
const expenseData = require("../../models/expense");
const partialData = require("../../models/partial");

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
  data = await sell.aggregate([
    {
      $lookup: {
        from: "transections",
        localField: "tId",
        foreignField: "t_id",
        as: "transection",
      },
    },
  ]);

  res.json({ data });
});

router.post("/add", async (req, res) => {
  const { client, products, payment, expense } = req.body;
  let cid = 0;
  let eid = 0;
  let parId = 0;

  //checking new client
  if (!client.old) {
    let cData = new clientData({
      cid: Date.now(),
      name: client.info.name,
      email: client.info.email,
      pn: client.info.pn,
      address: client.info.address,
      city: client.info.city,
    });

    cData = await cData.save();
    cid = cData.cid;
  } else {
    cid = client.info.cid;
  }

  if (expense.price > 0) {
    let exp = new expenseData({
      e_id: Date.now(),
      price: expense.price,
      details: expense.details,
    });

    let expObj = await exp.save();
    eid = expObj.e_id;
  }

  if (payment.due > 0) {
    let pdata = new partialData({
      par_id: Date.now(),
      status: true,
      clientId: cid,
      amount: {
        total: payment.totalAmount,
        paid: payment.paid,
        due: payment.due,
      },
      history: [{ paid: payment.paid, due: payment.due }],
    });

    pdata = await pdata.save();
    parId = pdata.par_id;
  }

  const transData = new tdata({
    t_id: Date.now(),
    type: "sell",
    cid,
    eid,
    products: [...products],
    amount: {
      totalAmount: payment.totalAmount,
      totalItems: products.length,
      onlyPrice: payment.onlyPrice,
    },
    payment: {
      paid: payment.paid,
      due: payment.due,
    },
    partial: {
      active: payment.due > 0 ? true : false,
      id: parId,
    },
  });

  let trans = await transData.save();
  if (payment.due > 0) partialUpdate(parId, trans.t_id);
  newSellData(trans.t_id, eid, cid);
  updateProducts(products);

  res.json({ status: "Success", code: 200 });
});

const partialUpdate = async (parId, tid) => {
  const partData = await partialData.findOne({ par_id: parId });
  partData.tId = tid;
  await partData.save();
};
const newSellData = async (tId, eid, clientId) => {
  const sellObj = new sell({
    s_id: Date.now(),
    eid,
    tId,
    clientId,
  });

  await sellObj.save();
};
const updateProducts = async (pros) => {
  pros.forEach(async (data) => {
    let pdata = await productSchema.findOne({ p_id: data.p_id });
    pdata.amount -= data.quantity;
    await pdata.save();
  });
};

module.exports = router;

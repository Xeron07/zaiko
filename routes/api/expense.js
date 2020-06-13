/** @format */

const router = require("express").Router();
const mongoose = require("mongoose");
const expense = require("../../models/expense");
const expenseType = require("../../models/expenseType");

const { clientValidation } = require("./validation");

router.get("/all", async (req, res) => {
  const data = await expense.find({});
  data ? res.json({ err: false, data }) : res.json({ err: true, data: [] });
});

router.post("/update", async (req, res) => {
  const { e_id, price, details } = req.body;
  const data = await expense.findOne({ e_id });
  if (data) {
    data.price = price;
    data.details = details;
    await data.save();
    res.json({ type: "success", msg: "Updated successfully" });
  } else {
    res.json({ type: "warning", msg: "Expense not found" });
  }
});

router.post("/delete/:id", async (req, res) => {
  const info = req.params.id;
  const data = await expense.deleteOne({ e_id: info });
  data == 1 ? res.json({ res: "success" }) : res.json({ res: "error" });
});

router.post("/all/:id", async (req, res) => {
  const data = await expense.findOne({ e_id: req.params.id });
  data ? res.json({ err: false, data }) : res.json({ err: true, data: [] });
});

router.post("/add", async (req, res) => {
  const { price, details, type } = req.body;
  const val = new expense({
    e_id: Date.now(),
    price,
    details,
    type,
  });
  let data = await val.save();
  data ? res.json({ err: false, data }) : res.json({ err: true, data: [] });
});

router.post("/type/add", async (req, res) => {
  const { name } = req.body;
  const val = new expenseType({
    eType: Date.now(),
    name,
  });
  let data = await val.save();
  res.json({ data });
});

router.get("/type/all", async (req, res) => {
  const data = await expenseType.find({});
  res.json({ data });
});

router.post("/type/delete", async (req, res) => {
  const data = await expenseType.deleteOne({ eType: req.body.eType });
  res.json({ data });
});

module.exports = router;

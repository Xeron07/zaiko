/** @format */

const router = require("express").Router();
const mongoose = require("mongoose");
const stock = require("../../models/product");
const transections = require("../../models/transection");
const sell = require("../../models/expense");
const pur = require("../../models/product");
const clientData = require("../../models/client");
const lossData = require("../../models/loss");

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
    $group: {
      _id: null,
      totalAmount: { $sum: "$amount.totalAmount" },
      recieved: { $sum: "$payment.paid" },
      due: { $sum: "$payment.due" },
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
    $group: {
      _id: null,
      totalAmount: { $sum: "$amount.totalAmount" },
      paid: { $sum: "$payment.paid" },
      due: { $sum: "$payment.due" },
    },
  },
];

const lossCalculationPipeline = [
  {
    $match: { time: { $gte: start, $lt: end } },
  },
  {
    $group: {
      _id: null,
      totalLoss: { $sum: "$amount" },
    },
  },
];

const totalStock = [
  {
    $project: {
      totalFish: { $sum: "$amount" },
      totalStock: { $sum: { $multiply: ["$amount", "$unit_price"] } },
    },
  },
];

router.get("/all", async (req, res) => {
  const sellData = await transections.aggregate(sellPipeline);
  const purchaseData = await transections.aggregate(purchasePipeline);
  const stockData = await stock.aggregate(totalStock);
  const fishTypes = await stock.countDocuments();
  const lossCalculation = await lossData.aggregate(lossCalculationPipeline);
  const totalSelled = await transections
    .find({})
    .where({ time: { $gte: start, $lt: end }, type: "sell" });
  const totalPurchased = await transections
    .find({})
    .where({ time: { $gte: start, $lt: end }, type: "purchase" });
  const todayLoss = await lossData.find({}).where({
    time: { $gte: start, $lt: end },
  });
  const profit =
    (sellData[0] ? sellData[0].recieved : 0) -
    (purchaseData[0] ? purchaseData[0].paid : 0) -
    (lossCalculation[0] ? lossCalculation[0].totalLoss : 0);
  res.json({
    sellData: sellData[0] ? sellData[0] : null,
    purchaseData: purchaseData[0] ? purchaseData[0] : null,
    totalSelled,
    totalPurchased,
    profit,
    stockData,
    fishTypes,
    totalLoss: lossCalculation[0] ? lossCalculation[0].totalLoss : 0,
    todayLoss,
  });
});

router.get("/trans/all", async (req, res) => {
  const dailyPipeline = [
    // {
    //   $match: {
    //     time: { $gte: start, $lt: end },
    //   },
    // },
    {
      $lookup: {
        from: "clients",
        localField: "cid",
        foreignField: "cid",
        as: "client",
      },
    },
  ];
  const data = await transections.aggregate(dailyPipeline);
  res.json(data);
});

router.get("/daily/trans", async (req, res) => {
  const dailyPipeline = [
    {
      $match: {
        time: { $gte: start, $lt: end },
      },
    },
    {
      $lookup: {
        from: "clients",
        localField: "cid",
        foreignField: "cid",
        as: "client",
      },
    },
  ];
  const data = await transections.aggregate(dailyPipeline);
  res.json(data);
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

router.get("/transection/all", async (req, res) => {
  const data = await transections.aggregate([
    {
      $lookup: {
        from: "clients",
        localField: "cid",
        foreignField: "cid",
        as: "clients",
      },
    },
  ]);
  data ? res.json({ data }) : res.json({ data: false });
});

router.get("/details", async (req, res) => {
  const data = transections.find({}).where();
  data ? res.json({ data }) : res.json({ data: [] });
});

router.post("/loss", async (req, res) => {
  const { pid, quantity, productLoss, lossAmount } = req.body;

  const purchaseData = await transections
    .find({ "products.p_id": pid })
    .sort({ time: "desc" })
    .limit(10)
    .select("products.unitPrice");

  console.log(purchaseData);
  let count = purchaseData.length;
  let totalUnitPrice = 0;
  for (let i = 0; i < count; i++) {
    totalUnitPrice += +purchaseData[i].products[0].unitPrice;
  }
  if (count == 0) {
    let p = await pur.findOne({ p_id: pid });
    console.log(p);
    totalUnitPrice = p.unit_price;
    count = 1;
  }
  const lossPrice = totalUnitPrice / count;
  console.error(lossPrice);
  let lossObj = new lossData({
    lossId: Date.now(),
    pid,
    quantity: productLoss ? quantity : 0,
    amount: productLoss ? lossPrice : lossAmount,
  });

  lossObj = await lossObj.save();

  if (productLoss) {
    let product = await pur.findOne({ p_id: pid });
    product.amount -= quantity;
    await product.save();
  }

  res.json({ lossObj, status: 200 });
});

router.get("/loss/all", async (req, res) => {
  const data = await lossData.find({});
  res.json(data);
});

router.get("/loss/get", async (req, res) => {
  const data = await lossData
    .find({})
    .where({ time: { $gte: start, $lt: end } });
  res.json(data);
});

router.get("/dateTime", async (req, res) => {
  const sellPipeline = [
    {
      $group: {
        _id: {
          month: { $month: "$time" },
          year: { $year: "$time" },
        },
        sell: {
          $sum: {
            $cond: {
              if: { $eq: ["$type", "sell"] },
              then: "$amount.totalAmount",
              else: 0,
            },
          },
        },
        purchase: {
          $sum: {
            $cond: {
              if: { $eq: ["$type", "purchase"] },
              then: "$amount.totalAmount",
              else: 0,
            },
          },
        },
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "losses",
        let: { month: "$_id.month" },
        pipeline: [
          {
            $group: {
              _id: {
                month: { $month: "$time" },
                year: { $year: "$time" },
              },
              loss: { $sum: "$amount" },
              count: { $sum: 1 },
            },
          },
          {
            $match: {
              $expr: { $eq: ["$_id.month", "$$month"] },
            },
          },
        ],
        as: "losses",
      },
    },
  ];

  const lossPipeline = [
    {
      $group: {
        _id: { month: { $month: "$time" }, year: { $year: "$time" } },
      },
    },
  ];

  const trData = await transections.aggregate(sellPipeline);
  const monthYear = await transections.aggregate(lossPipeline);
  res.json({ trData, monthYear });
});

router.get("/report/:month/:year", async (req, res) => {
  const queryDateStart = new Date();
  const queryDateEnd = new Date();
  queryDateStart.setMonth(req.params.month - 1);
  queryDateStart.setFullYear(req.params.year);
  queryDateStart.setHours(0, 0, 0, 0);
  queryDateEnd.setMonth(req.params.month - 1);
  queryDateEnd.setFullYear(req.params.year);
  queryDateEnd.setHours(23, 59, 59, 999);
  const pipeLine = [
    {
      $match: {
        time: { $gte: queryDateStart, $lt: queryDateEnd },
        type: "sell",
      },
    },
  ];

  console.log(queryDateStart, queryDateEnd);
  // const data = await transections.aggregate(pipeLine);
  const data = await transections.find({});
  res.json({ data });
});

router.get("/date/all", async (req, res) => {
  const queryPipeLine = [
    {
      $group: {
        _id: {
          date: { $dayOfMonth: "$time" },
          month: { $month: "$time" },
          year: { $year: "$time" },
        },
        sell: {
          $sum: {
            $cond: {
              if: { $eq: ["$type", "sell"] },
              then: "$amount.totalAmount",
              else: 0,
            },
          },
        },
        purchase: {
          $sum: {
            $cond: {
              if: { $eq: ["$type", "purchase"] },
              then: "$amount.totalAmount",
              else: 0,
            },
          },
        },
        count: { $sum: 1 },
        sellCount: {
          $sum: {
            $cond: {
              if: { $eq: ["$type", "sell"] },
              then: 1,
              else: 0,
            },
          },
        },
        purchaseCount: {
          $sum: {
            $cond: {
              if: { $eq: ["$type", "purchase"] },
              then: 1,
              else: 0,
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: "losses",
        let: { month: "$_id.month", date: "$_id.date" },
        pipeline: [
          {
            $group: {
              _id: {
                date: { $dayOfMonth: "$time" },
                month: { $month: "$time" },
                year: { $year: "$time" },
              },
              loss: { $sum: "$amount" },
              count: { $sum: 1 },
            },
          },
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id.month", "$$month"] },
                  { $eq: ["$_id.date", "$$date"] },
                ],
              },
            },
          },
        ],
        as: "losses",
      },
    },
  ];

  const data = await transections.aggregate(queryPipeLine);
  res.json({ data });
});

//always be on last
router.get("/:id", async (req, res) => {
  const data = await transections.findOne({ t_id: req.params.id });
  data ? res.json({ data }) : res.json({ data: false });
});

module.exports = router;

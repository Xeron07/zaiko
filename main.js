/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const personData = require("./routes/api/personData");
const productController = require("./routes/api/product");
const clientController = require("./routes/api/client");
const expenseController = require("./routes/api/expense");
const sellController = require("./routes/api/sell");
const operationController = require("./routes/api/operation");

require("./models/person");
require("./models/category");
require("./models/client");
require("./models/expense");
require("./models/purchase");
require("./models/product");
require("./models/sell");
require("./models/transection");
//APP OBJECTS
const app = express();

//CONFIGURATIONS
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/ext", express.static("ext"));
app.use("/media", express.static("media"));

//DB CONNECTION
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//MIDDLEWARE
app.post("/api/img/:name", (req, res) => {
  const imgLink = path.join(__dirname, "/media/img/" + req.params.name);
  res.sendFile(imgLink);
});
app.use("/api/person", personData);
app.use("/api/product", productController);
app.use("/api/client", clientController);

app.use("/api/expense", expenseController);
app.use("/api/sell", sellController);
app.use("/api/operation", operationController);

app.get("/", (req, res) => {
  res.send("foo");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//SERVER CREATION
const PORT = process.env.PORT || 7777;
app.listen(PORT, () => {
  console.log(`Server is running......${PORT}`);
});

/** @format */

import path from "path";
const express = require("express");
const app = express(),
  DIST_DIR = __dirname;

app.use(express.static(DIST_DIR));
app.get("*", (req, res) => {
  res.send("hello world");
});
const PORT = 8089;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});

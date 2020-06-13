const mongoose = require("mongoose");
const { Schema } = mongoose;

const purchaseSchema = new Schema({
  per_id: String,//purchases id
  eid: String,//expense id
  tid:String//transection id
});

module.exports = mongoose.model("purchase", purchaseSchema);

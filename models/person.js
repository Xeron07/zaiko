const mongoose = require("mongoose");
const { Schema } = mongoose;

const personSchema = new Schema({
  u_id: String,
  name: String,
  shortname: String,
  reknown: String,
  bio: String,
  p_pic: String,
  t_pic: String
});

module.exports = mongoose.model("persons", personSchema);

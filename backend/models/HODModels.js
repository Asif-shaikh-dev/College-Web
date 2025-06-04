const mongoose = require("mongoose");

const hodSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: { type: String}, // Unique department per HOD
  password: String,
});

module.exports = mongoose.model("HOD", hodSchema);

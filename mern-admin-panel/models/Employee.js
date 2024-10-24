// models/Employee.js
const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  f_Id: String,
  f_Image: String, // Image path
  f_Name: { type: String, required: true },
  f_Email: { type: String, required: true, unique: true },
  f_Mobile: { type: String, required: true},
  f_Designation: String,
  f_gender: String,
  f_Course: [String],
  f_Createdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employee", EmployeeSchema);

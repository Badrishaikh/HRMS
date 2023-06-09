const mongoose = require("mongoose");

var employeeEmailSchema = new mongoose.Schema({
  empID: { type: mongoose.Schema.Types.ObjectId },
  email: String,
  modifiedBy: { type: mongoose.Schema.Types.ObjectId },
  isVerified: Boolean,
  isPrimary: Boolean,
  emailType: String,
  createdAt: Number,
  updatedAt: Number,
})

const EmployeeEmailModel = mongoose.model(
  "EmployeeEmail", employeeEmailSchema
);

module.exports = EmployeeEmailModel;



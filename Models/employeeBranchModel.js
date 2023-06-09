const mongoose = require("mongoose");

var employeeBranchSchema = new mongoose.Schema({
  empID: { type: mongoose.Schema.Types.ObjectId },
  branchID: { type: mongoose.Schema.Types.ObjectId },
  accessGivenBy: { type: mongoose.Schema.Types.ObjectId },
  hasAccess: Boolean,
  createdAt: Number,
  updatedAt: Number,
})

const EmployeeBranchModel = mongoose.model(
  "EmployeeBranch", employeeBranchSchema
);

module.exports = EmployeeBranchModel;



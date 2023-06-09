const mongoose = require("mongoose");

var branchDepartmentModel = new mongoose.Schema({
  companyID: { type: mongoose.Schema.Types.ObjectId },
  branchID: { type: mongoose.Schema.Types.ObjectId },
  name: String,
  hod: { type: mongoose.Schema.Types.ObjectId },
})

const BranchDepartmentModel = mongoose.model(
  "BranchDepartment", branchDepartmentModel
);

module.exports = BranchDepartmentModel;

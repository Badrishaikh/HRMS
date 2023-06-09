const mongoose = require("mongoose");

var LeaveTypeSchema = new mongoose.Schema({
  companyID: { type: mongoose.Schema.Types.ObjectId },
  branchID: { type: mongoose.Schema.Types.ObjectId },
  name: String,  
  noOfHoliday: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId },
  createdAt: Number,
  updatedAt: Number,
})

const LeaveTypeModel = mongoose.model(
  "LeaveType", LeaveTypeSchema
);

module.exports = LeaveTypeModel;
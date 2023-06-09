const mongoose = require("mongoose");

var employeeLeaveSchema = new mongoose.Schema({
  empID: { type: mongoose.Schema.Types.ObjectId },
  branchID: { type: mongoose.Schema.Types.ObjectId },
  departmentID: { type: mongoose.Schema.Types.ObjectId },
  leaveTypeID: { type: mongoose.Schema.Types.ObjectId },
  leaveReason: String,
  leaveStartDate: Number,
  leaveEndDate: Number,
  leaveDoc: String,
  isDocMandatery: Boolean,
  numberOfDays: Boolean,
  isApproved: Boolean,
  actionTakenBy: { type: mongoose.Schema.Types.ObjectId },
  managers: [
    { type: mongoose.Schema.Types.ObjectId }
  ],
  status: String,
  createdAt: Number,
  updatedAt: Number,
})

const EmployeeLeaveModel = mongoose.model(
  "EmployeeLeave", employeeLeaveSchema
);

module.exports = EmployeeLeaveModel;

const mongoose = require("mongoose");

var HolidayModelSchema = new mongoose.Schema({
  companyID: { type: mongoose.Schema.Types.ObjectId },
  branchID: { type: mongoose.Schema.Types.ObjectId },
  createdBy: { type: mongoose.Schema.Types.ObjectId },
  startDate: Number,
  endDate: Number,
  numOfDays: Boolean,
  isLeaveApplicable: Boolean,
  createdAt: Number,
  updatedAt: Number,
})

const HolidayModel = mongoose.model(
  "HolidayModel", HolidayModelSchema
);

module.exports = HolidayModel;



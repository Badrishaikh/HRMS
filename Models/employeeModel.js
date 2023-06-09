const mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema({
  companyID: { type: mongoose.Schema.Types.ObjectId },
  branchID: { type: mongoose.Schema.Types.ObjectId },
  departmentID: { type: mongoose.Schema.Types.ObjectId },
  name: String, 
  empid: String, 
  primaryemail: String,
  countryCode: String,
  mobile: String,
  password: String,
  doj: Number,
  dob: Number,
  anniversary: Number,
  dateOfResign: Number,
  isResigned: Boolean,
  isWorkingToday: Boolean,
  todayLoginTime: Number,
  userType: String,
  employmentType:String,
  totalLeaveCount:Number,
  resetToken:Number,
  reportingManager: { type: mongoose.Schema.Types.ObjectId },
  createdAt:Number,
  updatedAt:Number,
})

const EmployeeModel = mongoose.model(
  "Employee", employeeSchema
);

module.exports = EmployeeModel;
// userType
// SuperAdmin
// Admin
// BranchAdmin
// Manager
// Hr,
// Staff,
// Employee


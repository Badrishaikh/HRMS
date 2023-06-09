import mongoose from "mongoose";

var AttendanceModelSchema = new mongoose.Schema({
  companyID: { type: mongoose.Schema.Types.ObjectId },
  branchID: { type: mongoose.Schema.Types.ObjectId },
  departmentID: { type: mongoose.Schema.Types.ObjectId },
  emp_ID: { type: mongoose.Schema.Types.ObjectId },
  dayStartedOn:Date,
  dayEndOn:Date,
  totalTimeSpent:Number,
  actualWorkTime:Number,
  totalBreakTime:Number,
},{timestamps:true})
export default mongoose.model("AttendanceModel",AttendanceModelSchema)

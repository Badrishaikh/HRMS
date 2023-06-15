import mongoose from "mongoose";

var AttendanceModelSchema = new mongoose.Schema({
  companyID: { type: mongoose.Schema.Types.ObjectId },
  branchID: { type: mongoose.Schema.Types.ObjectId },
  departmentID: { type: mongoose.Schema.Types.ObjectId },
  emp_ID: { type: mongoose.Schema.Types.ObjectId },
  entryType:String,
  
},{timestamps:true})
export default mongoose.model("AttendanceModel",AttendanceModelSchema)

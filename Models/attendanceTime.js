import mongoose from "mongoose";

var AttendanceSettingModelSchema = new mongoose.Schema({
  companyID: { type: mongoose.Schema.Types.ObjectId },
  branchID: { type: mongoose.Schema.Types.ObjectId },
  createdBy: { type: mongoose.Schema.Types.ObjectId },
  entrytype: String,
  time:Number,
  status:Boolean,
},{timestamps:true})
export default mongoose.model("attendanceTime",AttendanceSettingModelSchema)



import mongoose from "mongoose";

var LeaveTypeSchema = new mongoose.Schema({
  companyID: { type: mongoose.Schema.Types.ObjectId },
  branchID: { type: mongoose.Schema.Types.ObjectId },
  name: String, 
  noOfLeave:Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId },
 
},{ timestamps: true })

export default mongoose.model("LeaveType",LeaveTypeSchema)


import mongoose from "mongoose"

var employeeLeaveSchema = new mongoose.Schema({
  emp_ID: { type: mongoose.Schema.Types.ObjectId },
  // empID:String,
  branchID: { type: mongoose.Schema.Types.ObjectId },
  departmentID: { type: mongoose.Schema.Types.ObjectId },
  leaveTypeID: { type: mongoose.Schema.Types.ObjectId },
  leaveReason: String,
  // leaveStartDate: Number,
  // leaveEndDate: Number,
  leaveStartDate: Date,
  leaveEndDate: Date,
  leaveDoc: String,
  isDocMandatery: Boolean,
  numberOfDays: Number,
  isApproved: Boolean,
  actionTakenBy: { type: mongoose.Schema.Types.ObjectId }, //leave aprove hr
  managers: [
    { type: mongoose.Schema.Types.ObjectId } // kis ko leave notify or alert dena hain
  ],
  status: String,
},{timestamps:true})

export default mongoose.model("EmployeeLeave",employeeLeaveSchema)
// const EmployeeLeaveModel = mongoose.model(
//   "EmployeeLeave", employeeLeaveSchema
// );

// module.exports = EmployeeLeaveModel;

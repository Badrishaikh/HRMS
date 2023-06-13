import mongoose from "mongoose";

var employeeBranchSchema = new mongoose.Schema({
  // empID: { type: mongoose.Schema.Types.ObjectId },
  empID:String,
  branchID: { type: mongoose.Schema.Types.ObjectId },
  departmentID: { type: mongoose.Schema.Types.ObjectId },
  accessGivenBy: { type: mongoose.Schema.Types.ObjectId }, //hr or admin
  hasAccess: Boolean,
  createdAt: Number,
  updatedAt: Number,
})
export default mongoose.model("EmployeeBranch",employeeBranchSchema)





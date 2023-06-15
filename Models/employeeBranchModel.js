import mongoose from "mongoose";

var employeeBranchSchema = new mongoose.Schema({
   emp_ID: { type: mongoose.Schema.Types.ObjectId },
  // empID:String,
  branchID: { type: mongoose.Schema.Types.ObjectId },
  departmentID: { type: mongoose.Schema.Types.ObjectId },
  accessGivenBy: { type: mongoose.Schema.Types.ObjectId }, //hr or admin
  hasAccess: Boolean,
  
},{timestamps:true})
export default mongoose.model("EmployeeBranch",employeeBranchSchema)
// emp_id is obj  id of employee collection





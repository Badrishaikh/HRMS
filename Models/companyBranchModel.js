import mongoose from "mongoose"

var companyBranchSchema = new mongoose.Schema({
  companyID: { type: mongoose.Schema.Types.ObjectId },
  name: String,
  location: String,
  countryCode: String,
  mobile: String,
  email: String,
  address: String,
  noOfEmp: Number,
  hob: { type: mongoose.Schema.Types.ObjectId },
})
export default mongoose.model("CompanyBranch",companyBranchSchema)
// hob
// head of branch

// const CompanyBranchModel = mongoose.model(
//   "CompanyBranch", companyBranchSchema
// );

// module.exports = CompanyBranchModel;

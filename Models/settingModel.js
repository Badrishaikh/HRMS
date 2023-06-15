import mongoose from "mongoose";

var SettingModelSchema = new mongoose.Schema({
  companyID: { type: mongoose.Schema.Types.ObjectId },
  branchID: { type: mongoose.Schema.Types.ObjectId },
  createdBy: { type: mongoose.Schema.Types.ObjectId },
  key: String,
  value: Object,
  isActive:Boolean,
},{timestamps:true})
export default mongoose.model("SettingModel",SettingModelSchema)



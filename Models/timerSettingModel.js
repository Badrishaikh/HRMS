import mongoose from "mongoose";
var TimerSettingModelSchema = new mongoose.Schema({
    companyID: { type: mongoose.Schema.Types.ObjectId },
    branchID: { type: mongoose.Schema.Types.ObjectId },
    createdBy: { type: mongoose.Schema.Types.ObjectId },
    key: String,
    value: Boolean,
  
  },{timestamps:true})
  export default mongoose.model("TimerSettingModel",TimerSettingModelSchema)

//   key:breakTimeStatus,
// value:true/false
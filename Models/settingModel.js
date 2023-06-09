const mongoose = require("mongoose");

var SettingModelSchema = new mongoose.Schema({
  companyID: { type: mongoose.Schema.Types.ObjectId },
  branchID: { type: mongoose.Schema.Types.ObjectId },
  createdBy: { type: mongoose.Schema.Types.ObjectId },
  key: String,
  value: Object,
  isActive:Boolean,
  createdAt: Number,
  updatedAt: Number,
})

const SettingModel = mongoose.model(
  "SettingModel", SettingModelSchema
);

module.exports = SettingModel;



const mongoose = require("mongoose");

var companySchema = new mongoose.Schema({
  name: String,
  email: String,
  countryCode: String,
  mobile: String,
  address: String,
  noOfEmp: Number,
  shortCode: String,
  website: String,
  ownerID: { type: mongoose.Schema.Types.ObjectId },
  createdAt:Number,
  updatedAt:Number,
})

const CompanyModel = mongoose.model(
  "Company", companySchema
);

module.exports = CompanyModel;

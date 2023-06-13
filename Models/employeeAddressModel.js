const mongoose = require("mongoose");

var employeeAddressSchema = new mongoose.Schema({
  empID: { type: mongoose.Schema.Types.ObjectId },
  address: String, 
  addressType: String,  
  countryCode: String,
  mobile: String,
  createdAt: Number,
  updatedAt: Number,
})

const EmployeeAddressModel = mongoose.model(
  "EmployeeAddress", employeeAddressSchema
);

module.exports = EmployeeAddressModel;



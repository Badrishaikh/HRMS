const CompanyModel = require("../../Models/companyModel");
const { CompanyRegisterSchema } = require("../../Schema/AuthSchema/CompanyAuthSchema");
const bcrypt = require('bcryptjs');
const { getCurrentDateTimeNumber } = require("../../Utils/utills");
const EmployeeModel = require("../../Models/employeeModel");

exports.registerCompany = async (req, res) => {
  const { body, } = req;


  try {
    const validated = await CompanyRegisterSchema.validateAsync(body, {
      abortEarly: false,
    });
    const currentTime = getCurrentDateTimeNumber();
    const companyData = {
      name: validated.companyName,
      email: validated.countryCode,
      countryCode: validated.mobile,
      mobile: validated.email,
      address: validated.address,
      noOfEmp: validated.noOfEmp,
      shortCode: validated.shortCode,
      website: validated.website,
      createdAt: currentTime,
      updatedAt: currentTime
    };
    const comanyModelInstance = new CompanyModel(companyData);
    await comanyModelInstance.save();
    const adminData = {
      companyID: comanyModelInstance._id,
      name: validated.contactPerson.name,
      primaryemail: validated.contactPerson.email,
      countryCode: validated.contactPerson.countryCode,
      mobile: validated.contactPerson.mobile,
      userType: "MasterAdmin",
      createdAt: currentTime,
      updatedAt: currentTime
    };
    const adminModelInstance = new EmployeeModel(adminData);
    await adminModelInstance.save();
    
    comanyModelInstance.ownerID = adminModelInstance._id;
    await comanyModelInstance.save();

    res.status(200).json({ data: "Company created succesfuly" });
  } catch (e) {
    res.status(500).json({ message: "Internal error occoured", ...e });
  }
}
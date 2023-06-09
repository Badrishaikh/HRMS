const Joi = require("joi");


const CompanyRegisterSchema = Joi.object({
  companyName: Joi.string().required().label("Name"),
  countryCode: Joi.string().required().label("Country Code"),
  mobile: Joi.string().required().label("Mobile"),
  email: Joi.string().email().required().label("Email"),
  address: Joi.string().required().label("Company Address"),
  noOfEmp: Joi.number().required().label("Number of Employee"),
  shortCode: Joi.string().required().label("Short Code"),
  website: Joi.string().required().label("Website"),
  contactPerson: Joi.object({
    name: Joi.string().required().label("Contact Person Name"),
    email: Joi.string().required().label("Contact Person Email"),
    countryCode: Joi.string().required().label("Contact Person Country Code"),
    mobile: Joi.string().required().label("Contact PersonName"),
  }).required().label("Contact Person Details")
});



module.exports = {
  CompanyRegisterSchema,
}
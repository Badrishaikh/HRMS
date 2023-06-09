const Joi = require("joi") ;

const EmployeeLoginSchema = Joi.object({
  mobile: Joi.string().required().label("Mobile"),
  password: Joi.string().min(5).required().label("Password"),
});

const EmployeeForgotSchema = Joi.object({
  mobile: Joi.string().required().label("Mobile"),
});

const EmployeeRegisterSchema = Joi.object({
  name: Joi.string().required().label("Name"),
  mobile: Joi.string().required().label("Mobile"),
  email: Joi.string().email().required().label("Email"), 
  password: Joi.string().min(6).required().label('Password'),
  gender: Joi.string().label("Gender"),
  dob: Joi.string().label("DOB"),
  isReffered: Joi.number().label("isReffered"),
  doctorid: Joi.number().label("Reffered Doctor"),
  address: Joi.string().label("User address"),
});


const EmployeeResetSchema = Joi.object({
  mobile: Joi.string().required().label("Mobile"),
  resetCode: Joi.string().min(6).max(6).required().label("Reset Code"),
  newPassword: Joi.string().min(6).required().label('New Password')
});
module.exports = {
  EmployeeLoginSchema,
  EmployeeForgotSchema,
  EmployeeRegisterSchema,
  EmployeeResetSchema
}
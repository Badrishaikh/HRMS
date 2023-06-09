
const Joi = require("joi") ;
 exports.CommonIdValidator = Joi.object({
    id: Joi.number().label("Id"),
    clinicId: Joi.number().label("Clinic Id"),
    locationId: Joi.number().label("Location Id"),
    patientId: Joi.number().label("Patient Id"),
    doctorId: Joi.number().label("Patient Id"),
  });
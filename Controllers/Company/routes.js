const express = require('express');
const router = express.Router();
 
const CompanyAuthController = require('./CompanyAuthController'); 

const jwtHelper = require('../../middleware/jwtMiddleware');

router.post('/company/register', CompanyAuthController.registerCompany);
// router.post('/employee/login', EmployeeLoginController.loginUser);
// router.get('/employee/profile',jwtHelper.verifyPatientJwtToken, CompanyAuthController.userProfile); 

module.exports = router;
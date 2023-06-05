import express from "express";
import * as adminCtrl from "../Controllers/SuperAdmin/admin.js";
import * as companyCtrl from "../Controllers/CompanyProfile/cmp_profile_create.js";
import * as hrCtrl from "../Controllers/HR/hr.js";
import * as empCtrl from "../Controllers/Employee/employee.js";
import * as holidayCtrl from "../Controllers/Holiday/holiday.js";
import upload from "../multer.js"
const Router= express.Router();
Router.post("/admin-register", adminCtrl.registerHRMS);
Router.post("/admin-login", adminCtrl.loginHRMS);
//-----Company---
Router.post("/create-company", companyCtrl.createCompany);
Router.get("/all-company", companyCtrl.getAllcmp);
Router.get("/get-company-profile", companyCtrl.getProfile);
Router.get("/get-all-emp", companyCtrl.getAllEmp);
Router.get("/view-emp/:id", companyCtrl.viewEmp);
Router.get("/get-all-hr", companyCtrl.getAllHr);
Router.get("/view-hr/:id", companyCtrl.viewHr);
Router.get("/holiday-list", holidayCtrl.holiday);

//-----particular company login----
Router.post("/cmp-login", companyCtrl.companyAdminLogin);
//-----Create HR--------
Router.post("/create-hr", hrCtrl.create);
Router.post("/login-hr", hrCtrl.login);
Router.get("/get-profile", hrCtrl.getProfile);
Router.put("/hr-profilepic",upload.single("image"),hrCtrl.profilepic);
Router.put("/cancel-cheque-hr",upload.single("cheque"), hrCtrl.chequeUplod);
Router.put("/pan-card-hr",upload.single("pancard"), hrCtrl.panCardUpload);
Router.put("/update-hr", hrCtrl.update);
Router.post("/create-holiday", holidayCtrl.createHolidays);

//----- holiday-list---emp-hr---
Router.get("/holiday-list", holidayCtrl.holidaylist);

//-------employee----
Router.post("/create-employee", empCtrl.create);
Router.post("/login-employee", empCtrl.login);
Router.get("/get-profile", empCtrl.getProfile);
Router.put("/employee-profilepic",upload.single("image"), empCtrl.profilepic);
Router.put("/cancel-cheque-emp",upload.single("cheque"), empCtrl.chequeUplod);
Router.put("/pan-card-emp",upload.single("pancard"), empCtrl.panCardUpload);
Router.put("/update-employee", empCtrl.EmpUpdate);
Router.post("/leave-emp", empCtrl.leave);
export default Router;


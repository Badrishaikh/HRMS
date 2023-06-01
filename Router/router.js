import express from "express";
import * as adminCtrl from "../Controllers/SuperAdmin/admin.js";
import * as companyCtrl from "../Controllers/CompanyProfile/cmp_profile_create.js";
import * as hrCtrl from "../Controllers/HR/hr.js";
import * as empCtrl from "../Controllers/Employee/employee.js";
import upload from "../multer.js"
const Router= express.Router();
Router.post("/admin-register", adminCtrl.registerHRMS);
Router.post("/admin-login", adminCtrl.loginHRMS);
//----create-Company---
Router.post("/create-company", companyCtrl.createCompany);
Router.get("/all-company", companyCtrl.getAllcmp);
//-----particular company login----
Router.post("/cmp-login", companyCtrl.companyAdminLogin);
//-----Create HR--------
Router.post("/create-hr", hrCtrl.create);
Router.post("/login-hr", hrCtrl.login);
Router.put("/hr-profilepic",
upload.single("image"),
hrCtrl.profilepic
);
//-------employee----
Router.post("/create-employee", empCtrl.create);
Router.post("/login-employee", empCtrl.login);
Router.put("/employee-profilepic",upload.single("image"), empCtrl.profilepic);
Router.put("/cancel-cheque",upload.single("cheque"), empCtrl.chequeUplod);
Router.put("/pan-card",upload.single("pancard"), empCtrl.panCardUpload);
Router.put("/update-employee", empCtrl.EmpUpdate);
export default Router;


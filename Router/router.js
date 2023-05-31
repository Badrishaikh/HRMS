import express from "express";
import * as userCtrl from "../Controller/user.js";
import * as companyCtrl from "../Controller/cmp_profile_create.js";
import * as hrCtrl from "../Controller/hr.js";
import * as empCtrl from "../Controller/employee.js";
import upload from "../multer.js"
const Router= express.Router();
Router.post("/test", userCtrl.HRMSreg);
Router.post("/hrlog", userCtrl.HRMSlogin);
//----create-Company---
Router.post("/cmp-profile", companyCtrl.Company);
Router.get("/all-cmp-profile", companyCtrl.Allcmp);
//-----particular company login----
Router.post("/cmp-login", companyCtrl.companyAdminlogin);
//-----Create HR--------
Router.post("/create-hr", hrCtrl.HR);
Router.post("/hr-login", hrCtrl.HRlogin);
Router.put("/hr-avatar",
upload.single("image"),
hrCtrl.HRavatar
);
//-------employee----
Router.post("/create-employee", empCtrl.Employee);
Router.post("/employee-login", empCtrl.Employeelogin);
Router.put("/employee-avatar",upload.single("image"), empCtrl.Empavatar);
export default Router;


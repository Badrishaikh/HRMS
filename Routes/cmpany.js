import * as companyCtrl from "../Controllers/Company/CompanyAuthController.js";
import express from "express";

const Router= express.Router();

Router.post("/create-company", companyCtrl.registerCompany);
Router.post('/user/forgotpass/:token', companyCtrl.resetForgotPassword);
Router.post("/create-branch", companyCtrl.createBranch);
Router.post("/create-department", companyCtrl.createDepartment);

export default Router;

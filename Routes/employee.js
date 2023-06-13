import * as  employeeyCtrl from "../Controllers/Employee/EmployeeAuthController.js";
import express from "express";

const Router= express.Router();

Router.post("/login", employeeyCtrl.login);
Router.post("/emp-create", employeeyCtrl.create);
Router.post("/leave-apply", employeeyCtrl.employeeLeave);
Router.post("/emp-branch", employeeyCtrl.employeeBranch);



export default Router;
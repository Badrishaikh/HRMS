import * as  leaveCtrl from "../Controllers/Leave/LeaveAuthController.js";
import express from "express";

const Router= express.Router();
Router.post("/leave-create", leaveCtrl.createLeave);
Router.post("/leave-status", leaveCtrl.leaveAndreject);
Router.post("/get-all-leave", leaveCtrl.getAllLeave);


export default Router;
 
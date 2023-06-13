import * as  leaveCtrl from "../Controllers/Leave/LeaveAuthController.js";
import express from "express";

const Router= express.Router();
Router.post("/leave-create", leaveCtrl.createLeave);


export default Router;
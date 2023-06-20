import * as  settingCtrl from "../Controllers/Setting/SettingAuthController.js";
import express from "express";

const Router= express.Router();
Router.post("/leave-setting", settingCtrl.createSandwichLeave);
Router.post("/breack-time-setting", settingCtrl.createBreakTimer);
Router.post("/attendace-setting-time", settingCtrl.createAttendanceTimer);
Router.get("/get-setting-time", settingCtrl.getAttendanceTimer);



export default Router;

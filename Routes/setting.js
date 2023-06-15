import * as  settingCtrl from "../Controllers/Setting/SettingAuthController.js";
import express from "express";

const Router= express.Router();
Router.post("/leave-setting", settingCtrl.createSandwichLeave);



export default Router;

import * as  holiDayCtrl from "../Controllers/HoliDay/HolidayAuthController.js";
import express from "express";

const Router= express.Router();
Router.post("/holiday", holiDayCtrl.holiDay);


export default Router;
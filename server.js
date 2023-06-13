
import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv";
import CompanyAuthRoutes from "./Routes/cmpany.js";
import EmployeeAuthRoutes from "./Routes/employee.js";
import LeaveAuthRoutes from "./Routes/leave.js";
import HolidayAuthRoutes from "./Routes/holiday.js";


//const CompanyAuthRoutes = require('./Controllers/Company/routes');
dotenv.config();  
var PORT=9090
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(CompanyAuthRoutes)
app.use(EmployeeAuthRoutes)
app.use(LeaveAuthRoutes)
app.use(HolidayAuthRoutes)
// mongoose.set('strictQuery', false)
mongoose
    .connect("mongodb+srv://fahim:VlC1J930kCjLfaGx@cluster0.qjlbx0h.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((res) => console.log("Connected to the DB"))
    .catch((err) => console.log("error while connecting to db: ", err));

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));

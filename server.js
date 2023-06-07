import express from "express";
import path from "path"
import rout from "./Router/router.js"
import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();  
const app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static("uploads"));
//app.use("/uploads/BookmakerImage", express.static("uploads/BookmakerImage"));
app.use(rout)
mongoose
  .connect("mongodb+srv://fahim:VlC1J930kCjLfaGx@cluster0.qjlbx0h.mongodb.net/?retryWrites=true&w=majority", {
     useNewUrlParser: true,
      useUnifiedTopology: true
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
 
  .then((res) => console.log("Connected to the DB"))
  .catch((err) => console.log("error while connecting to db: ", err));
  app.use("*",function(req,res){
    res.send("this route is not found")
  })
app.listen(9090,()=>{
 console.log("server connected")
})
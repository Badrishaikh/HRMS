import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import userModel from "../Models/hr.js";
import {validateAuthKey,validateAdmin} from '../middleware/auth.js';
export const HR =[
    validateAuthKey,
    async(req, res) => {
     const { id } = req.user;
     console.log(id)  
try {
      const {name,email,password,contact_no,addres} = req.body
      console.log(req.user)
      if (!name || !email || !password || !contact_no || !addres) {
    
        return res.status(401).json({ message: "All fields are mandatory" });
    
      }
      const userExist = await userModel.findOne({email});
      if (userExist) {
    
        return res.json({ message: "email id already exists" });
      }
      const user = await userModel.create({name, email,password,contact_no,addres,cId:id });
    
      if (user) {
      
       return res.json({
          _id: user._id,
          name: user.name,
           email: user.email,
           password: user.password,
           contact_no: user.contact_no,
           addres: user.addres,
          //isAdmin: user.isAdmin,
    
        });
      }
} catch (err) {
        console.log(err);
      }    
    
    
    }];

    export const HRlogin = async (req, res) => {
        const {email,password } = req.body;
        if (!email || !password) {
          return res
            .status(400)
            .json({ success: false, msg: "Required field is missing" });
        }
        try {
         var user = await userModel.findOne({email}).select("+password");
         console.log(user)
          if (!user) {
           
            return res.json("Not ound any  users");
          }
          // if (user.password!==req.body.password) {
           
          //   return res.json("Not match pass");
          // }
  
          const isPasswordValid = await user.comparePassword(password);
          if (!isPasswordValid) {
            return res.json("Please provide the correct information")
          
          }
           
          const token= jwt.sign({
            id:user._id,
           
      
           },process.env.SECRET_KEY)
           res.status(200).json({token, user})
         // await sendTokenResponse(user, res);
        } catch (error) {
          console.error(error);
          return res
            .status(500)
            .json({ success: false, msg: "Opps something went wrong!!" });
        }
      };    

      export const HRavatar =[
        validateAuthKey,
        async(req, res) => {
         const { id } = req.user;
         console.log(id)  
    try {

        //  const existsUser = await userModel.findById(id);

        //  const existAvatarPath = `uploads/${existsUser.avatar}`;
  
        // fs.unlinkSync(existAvatarPath);
  
        const fileUrl = path.join(req.file.filename);
        console.log(fileUrl)
  
        const user = await userModel.findByIdAndUpdate(id, {
          avatar: fileUrl,
        },{new:true});
  
        res.status(200).json({
          success: true,
          user,
        });
          
    } catch (err) {
            console.log(err);
          }    
        
        
        }];     
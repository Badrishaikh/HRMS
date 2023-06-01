import jwt from "jsonwebtoken";
import cmpModel from "../../Models/cmp_profile_create.js";
import {validateAuthKey,validateAdmin} from '../../middleware/auth.js';
export const createCompany =[
  validateAdmin,
  async(req, res) => {
    const {company_name,email,password,contact_no,addres} = req.body
    console.log(req.body)
    if (!company_name || !email || !password || !contact_no || !addres) {
  
      return res.status(401).json({ message: "All fields are mandatory" });
  
    }
    const userExist = await cmpModel.findOne({ company_name });
    if (userExist) {
  
      return res.json({ message: "email id already exists" });
    }
    const user = await cmpModel.create({company_name, email,password,contact_no,addres });
  
    if (user) {
      // await sendTokenResponse(user, res);
  
      res.json({
        _id: user._id,
        company_name: user.company_name,
         email: user.email,
         password: user.password,
         contact_no: user.contact_no,
         addres: user.addres,
        //isAdmin: user.isAdmin,
  
      });
  
    } else {
      // res.status(404);
      throw new Error("User Not Found");
    }
  }];
  export const getAllcmp =[
    validateAdmin,
     async (req, res) => {
    
      try {
        const results = await cmpModel.find({});
       if(results){
        return res.json(results)
       }
      } catch (err) {
        throw err;
      }
   
    }]

    export const companyAdminLogin = async (req, res) => {
      const {email,password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, msg: "Required field is missing" });
      }
      try {
       var user = await cmpModel.findOne({email}).select("+password");
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
          cAdmin:user.cAdmin
    
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
   
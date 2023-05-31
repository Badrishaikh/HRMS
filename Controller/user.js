import userModel from "../Models/user.js";
import jwt from "jsonwebtoken";
export const HRMSreg = async (req, res) => {
  const {email,password } = req.body
  console.log(req.body)
  if (!email || !password) {

    return res.status(401).json({ message: "All fields are mandatory" });

  }
  const userExist = await userModel.findOne({ email });
  if (userExist) {

    return res.json({ message: "email id already exists" });
  }
  const user = await userModel.create({ email,password });

  if (user) {
    // await sendTokenResponse(user, res);

    res.json({
      _id: user._id,
       email: user.email,
       password: user.password,
      //isAdmin: user.isAdmin,

    });

  } else {
    // res.status(404);
    throw new Error("User Not Found");
  }
};


export const HRMSlogin = async (req, res) => {
  const {email,password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Required field is missing" });
  }
  try {
   var user = await userModel.findOne({
      email

    });
    if (!user) {
     
      return res.json("Not ound any  users");
    }
    if (user.password!==req.body.password) {
     
      return res.json("Not match pass");
    }
     
    const token= jwt.sign({
      id:user._id,
      hrms:user.hrms

     },"badri")
     res.status(200).json({token, user})
   // await sendTokenResponse(user, res);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Opps something went wrong!!" });
  }
};
import jwt from "jsonwebtoken";
import path from "path";
import empModel from "../../Models/employee.js";
import leaveModel from "../../Models/leave.js";
import { validateAuthKey, validateAdmin } from '../../middleware/auth.js';
export const create = [
  validateAuthKey,
  async (req, res) => {
    const { id } = req.user;
    console.log(id)
    try {
      const { name, email, password, contact_no, addres, empId } = req.body
      console.log(req.user)
      if (!name || !email || !password || !contact_no || !addres) {

        return res.status(401).json({ message: "All fields are mandatory" });

      }
      const userExist = await empModel.findOne({ empId });
      if (userExist) {

        return res.json({ message: "empId already exists" });
      }
      const user = await empModel.create({ name, email, password, contact_no, addres, empId, cId: id });

      if (user) {

        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          contact_no: user.contact_no,
          empId: user.empId,
          //isAdmin: user.isAdmin,

        });
      }
    } catch (err) {
      console.log(err);
    }


  }];

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Required field is missing" });
  }
  try {
    var user = await empModel.findOne({ email }).select("+password");
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

    const token = jwt.sign({
      id: user._id,
      is_emp: user.is_emp,
      cId:user.cId

    }, process.env.SECRET_KEY)
    res.status(200).json({ token, user })
    // await sendTokenResponse(user, res);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Opps something went wrong!!" });
  }
};

export const profilepic = [
  validateAuthKey,
  async (req, res) => {
    const { id } = req.user;
    console.log(id)
    try {

      //  const existsUser = await userModel.findById(id);

      //  const existAvatarPath = `uploads/${existsUser.avatar}`;

      // fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);
      console.log(fileUrl)

      const user = await empModel.findByIdAndUpdate(id, {
        avatar: fileUrl,
      }, { new: true });

      res.status(200).json({
        success: true,
        user,
      });

    } catch (err) {
      console.log(err);
    }


  }];

export const EmpUpdate = [
  validateAuthKey,
  async (req, res) => {
    const { id } = req.user;
    console.log(id)


    try {
      let updateEmp = {};
      updateEmp = req.body;
      console.log(updateEmp, "ww88ww")


      const user = await empModel.findByIdAndUpdate(id,
        updateEmp,
        { new: true });

      res.status(200).json({
        success: true,
        user,
      });

    } catch (err) {
      console.log(err);
    }


  }];

//   export const EmpUpdate =[

//     validateAuthKey,
//     async(req, res) => {
//      const { id } = req.user;
//      console.log(id)  


// try {
//   let updateEmp ;
//   updateEmp = req.body;
//   console.log(updateEmp,"ww88ww")
//   const user = await userModel.findById(id);

//   //  const user = await userModel.findByIdAndUpdate(id, 
//   //   updateEmp,
//   //   {new:true});
//   user.bankdetails.push(updateEmp);
//   await user.save();
//     res.status(200).json({
//       success: true,
//       user,
//     });

// } catch (err) {
//         console.log(err);
//       }    


//     }];        

export const chequeUplod = [
  validateAuthKey,
  async (req, res) => {
    const { id } = req.user;
    console.log(id)
    try {

      //  const existsUser = await userModel.findById(id);

      //  const existAvatarPath = `uploads/${existsUser.avatar}`;

      // fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);
      console.log(fileUrl)

      const user = await empModel.findByIdAndUpdate(id, {
        cancel_cheque: fileUrl,
      }, { new: true });

      res.status(200).json({
        success: true,
        user,
      });

    } catch (err) {
      console.log(err);
    }


  }];

export const panCardUpload = [
  validateAuthKey,
  async (req, res) => {
    const { id } = req.user;
    console.log(id)
    try {

      //  const existsUser = await userModel.findById(id);

      //  const existAvatarPath = `uploads/${existsUser.avatar}`;

      // fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);
      console.log(fileUrl)

      const user = await empModel.findByIdAndUpdate(id, {
        pan_img: fileUrl,
      }, { new: true });

      res.status(200).json({
        success: true,
        user,
      });

    } catch (err) {
      console.log(err);
    }


  }]; 
  
  export const getProfile = [
    validateAuthKey,
    async (req, res) => {
    //const id = req.body.userid;
    const { id } = req.user;
    console.log(id)
  try {
      const results = await empModel.find({_id:id});
      console.log(results)
      if(results){
        return res.json({results})
      }
     
    } catch (err) {
      throw err;
    }
  ;
  }];     
  
  export const leave= [
    validateAuthKey,
    async (req, res) => {
      const { id } = req.user;
      console.log(req.user)
      try {
        const { leaveType, fromDate, toDate, reasonforLeave,cId} = req.body
        console.log(req.user)
        if (!leaveType || !fromDate || !toDate || !reasonforLeave) {
  
          return res.status(401).json({ message: "All fields are mandatory" });
  
        }
       
        // if (userExist) {
  
        //   return res.json({ message: "empId already exists" });
        // }

        const data = await empModel.find();
        console.log(data[0].cId)
        
        const user = await leaveModel.create({ leaveType, fromDate, toDate, reasonforLeave, empId:id,cId:data[0].cId});
       const re= Math.round(( user.toDate - user.fromDate) / (1000 * 60 * 60 * 24));
       var diff = Math.floor((Date.parse(user.toDate) - Date.parse(user.fromDate)) / 86400000);
       console.log(diff)
        if (user) {
  
          return res.json({
            _id: user._id,
            leaveType: user.leaveType,
            fromDate: user.fromDate,
            toDate: user.toDate,
            reasonforLeave: user.reasonforLeave,
            empId: user.empId,
            //isAdmin: user.isAdmin,
  
          });
        }
      } catch (err) {
        console.log(err);
      }
  
  
    }];  
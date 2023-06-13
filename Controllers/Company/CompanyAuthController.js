import comModel from "../../Models/companyModel.js";
import empModel from "../../Models/employeeModel.js";
import branchModel from "../../Models/companyBranchModel.js";
import departmentModel from "../../Models/branchDepartmentModel.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { validateAuthKey, validateAdmin } from '../../middleware/jwtMiddleware.js';

// exports.registerCompany = async (req, res) => {
//   const { body, } = req;


//   try {
//     const validated = await CompanyRegisterSchema.validateAsync(body, {
//       abortEarly: false,
//     });
//     const currentTime = getCurrentDateTimeNumber();
//     const companyData = {
//       name: validated.companyName,
//       email: validated.countryCode,
//       countryCode: validated.mobile,
//       mobile: validated.email,
//       address: validated.address,
//       noOfEmp: validated.noOfEmp,
//       shortCode: validated.shortCode,
//       website: validated.website,
//       createdAt: currentTime,
//       updatedAt: currentTime
//     };
//     const comanyModelInstance = new CompanyModel(companyData);
//     await comanyModelInstance.save();
//     const adminData = {
//       companyID: comanyModelInstance._id,
//       name: validated.contactPerson.name,
//       primaryemail: validated.contactPerson.email,
//       countryCode: validated.contactPerson.countryCode,
//       mobile: validated.contactPerson.mobile,
//       userType: "MasterAdmin",
//       createdAt: currentTime,
//       updatedAt: currentTime
//     };
//     const adminModelInstance = new EmployeeModel(adminData);
//     await adminModelInstance.save();

//     comanyModelInstance.ownerID = adminModelInstance._id;
//     await comanyModelInstance.save();

//     res.status(200).json({ data: "Company created succesfuly" });
//   } catch (e) {
//     res.status(500).json({ message: "Internal error occoured", ...e });
//   }
// }

// name: String,
// email: String,
// countryCode: String,
// mobile: String,
// address: String,
// countryCode: Number,
// shortCode: String,
// website: String,

export const registerCompany = async (req, res) => {
  const { name, email, person, mobile, address, countryCode, shortCode, website } = req.body
  console.log(req.body)
  // if (!company_name || !email || !password || !contact_no || !addres) {

  //   return res.status(401).json({ message: "All fields are mandatory" });

  // }
  // const userExist = await cmpModel.findOne({ company_name });
  // if (userExist) {

  //   return res.json({ message: "email id already exists" });
  // }
  let empcount = await empModel.find().count()
  var LOC = "KOL"
  let cdate = new Date();
  let year1 = parseInt(cdate.getFullYear());
  let year = parseInt(cdate.getFullYear().toString().substring(2, 4));
  let month = cdate.getMonth() + 1;
  let serialNo = `SGC/${LOC}${year1 - 1}${year}/${empcount + 1}`;
  if (month > 3) {
    serialNo = `SGC/${LOC}${year1}${year + 1}/${empcount + 1}`;
  }
  console.log(serialNo);

  // console.log(getInvoiceSerialText)


  const buffer = crypto.randomBytes(48);
  const resetToken = buffer.toString('hex');
  const user = await comModel.create({ name, email, mobile, address, countryCode, shortCode, website, resetToken: resetToken });

  if (user) {

    const buffer = crypto.randomBytes(48);
    const resetToken = buffer.toString('hex');

    const result = new empModel({
      companyID: user._id,
      userType: "MasterAdmin",
      resetToken: resetToken,
      email: user.email,
      empid: serialNo

    })
    result.save()




    //const user = await comModel.create({name, email,person,mobile,address,countryCode,shortCode,website});
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      person: user.person,
      mobile: user.mobile,
      address: user.address,
      countryCode: user.countryCode,
      shortCode: user.shortCode,
      website: user.website,


    });

  } else {
    // res.status(404);
    throw new Error("User Not Found");
  }
};


export const resetForgotPassword = async (req, res) => {

  try {
    const { password } = req.body;
    console.log(req.params.token)
    console.log(req.params)

    if (!password) {
      return res.status(400).json({ error: 'You must enter a password.' });
    }

    const resetUser = await empModel.findOne({ resetToken: req.params.token });

    console.log("resetForgotPassword callled resetUser", resetUser)

    if (!resetUser) {
      return res.status(400).json({
        error:
          'Your token has expired. Please attempt to reset your password again.'
      });
    }

    // const salt = await bcrypt.genSalt(10);
    // const hash = await bcrypt.hash(password, salt);

    if (resetUser && resetUser.resetToken !== "") {
      console.log(resetUser.resetToken, "testing...")
      resetUser.password = password;
      resetUser.resetToken = undefined;

    }
    // resetUser.password = password;
    // resetUser.resetPasswordToken = undefined;

    resetUser.save();

    console.log("resetForgotPassword callled after save resetUser", resetUser)

    res.json({ message: "Password set successfully" })

  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
}



// const getInvoiceSerialText=(LOC)=>{
//   let cdate = new Date(); 
//  let year1 = parseInt(cdate.getFullYear());
//  let year = parseInt(cdate.getFullYear().toString().substring(2,4));
//  let month = cdate.getMonth()+1;
//  let serialNo = `SGC/${LOC}${year1-1}-${year}/`;
//  if(month>3){
//      serialNo = `SGC/${LOC}${year1}-${year+1}/`;
//  }
// //    console.log(serialNo);
//  return serialNo
// }



export const createBranch = [
  validateAuthKey,
  async (req, res) => {
    const { id } = req.user;
    const { companyID } = req.user;
    //   console.log(id)
    console.log(req.user)

    try {
      const { name, location, countryCode, mobile, email, address, noOfEmp, companyID } = req.body
      console.log(req.user)
      if (!name || !noOfEmp) {

        return res.status(401).json({ message: "All fields are mandatory" });

      }


      const user = await branchModel.create({
        name, location, countryCode, mobile, email, address, noOfEmp, companyID

      });

      if (user) {

        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          location: user.location,
          countryCode: user.countryCode,
          mobile: user.mobile,
          noOfEmp: user.noOfEmp,
          // mobile: user.mobile,
          //isAdmin: user.isAdmin,

        });
      }
    } catch (err) {
      console.log(err);
    }


  }];

export const createDepartment = [
  validateAuthKey,
  async (req, res) => {
    // const { id } = req.user;
    // const { companyID } = req.user;
    //   console.log(id)
    console.log(req.user)

    try {
      const { companyID, branchID, name } = req.body
      console.log(req.user)
      if (!name || !companyID) {

        return res.status(401).json({ message: "All fields are mandatory" });

      }

      const user = await departmentModel.create({ companyID, branchID, name });

      if (user) {

        return res.json({
          _id: user._id,
          companyID: user.companyID,
          branchID: user.branchID,
          name: user.name,


        });
      }
    } catch (err) {
      console.log(err);
    }


  }];




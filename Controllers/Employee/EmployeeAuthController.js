import jwt from "jsonwebtoken";
import empModel from "../../Models/employeeModel.js";
import empLeaveModel from "../../Models/employeeLeaveModel.js";
import branchModel from "../../Models/employeeBranchModel.js"
import { validateAuthKey, validateAdmin } from '../../middleware/jwtMiddleware.js';
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
        companyID:user.companyID,
        empID:user.empID,
        userType:user.userType,
        branchID:user.branchID,
        departmentID:user.departmentID,
  
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

  export const create = [
    validateAuthKey,
    async (req, res) => {
      const { id } = req.user;
      const { companyID } = req.user;
    //   console.log(id)
      console.log(req.user)
      const location=req.body.locId
      try {
        const { name, email, password,primaryemail,countryCode,mobile,doj,dob,isWorkingToday,
            todayLoginTime,
            userType,
            employmentType,
            locId,
            reportingManager,
            branchID,
            departmentID
             } = req.body
        console.log(req.user)
        if (!name || !email || !password ) {
  
          return res.status(401).json({ message: "All fields are mandatory" });
  
        }
        const userExist = await empModel.findOne({email });
        if (userExist) {
  
          return res.json({ message: "empId already exists" });
        }

        let empcount= await empModel.find().count()
        var LOC=location;
        let cdate = new Date(); 
       let year1 = parseInt(cdate.getFullYear());
       let year = parseInt(cdate.getFullYear().toString().substring(2,4));
       let month = cdate.getMonth()+1;
       let serialNo = `SGC/${LOC}${year1-1}${year}/${empcount+1}`;
       if(month>3){
           serialNo = `SGC/${LOC}${year1}${year+1}/${empcount+1}`;
       }

        const user = await empModel.create({ name, email, password,primaryemail,countryCode, mobile,doj,
            dob,
            isWorkingToday,
             todayLoginTime,
             userType,
             employmentType,
             locId,
             reportingManager,
             branchID,
             departmentID,
             empID:serialNo,
              companyID:companyID,
              creatorId:id

             });
  
        if (user) {
  
          return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            contact_no: user.contact_no,
            empID: user.empID,
            //isAdmin: user.isAdmin,
  
          });
        }
      } catch (err) {
        console.log(err);
      }
  
  
    }];  
//--employeeLeaveModel--

  export const employeeLeave = [
      validateAuthKey,
      async (req, res) => {
        // const { id } = req.user;
         const { companyID } = req.user;
         const { empID } = req.user;
         const { branchID } = req.user;
         const { departmentID } = req.user;
        //   console.log(id)
        //console.log(req.user)
    
        try {
          const { leaveTypeID,leaveReason, leaveStartDate,  leaveEndDate,
            leaveDoc,
            isDocMandatery,
            numberOfDays,
            isApproved,
            actionTakenBy,
            managers,
            status
           } = req.body
          console.log(req.user)
          // if (!leaveStartDate || !leaveEndDate) {
    
          //   return res.status(401).json({ message: "All fields are mandatory" });
    
          // }
    
          const user = await empLeaveModel.create({leaveTypeID,leaveReason, leaveStartDate,  leaveEndDate,
            leaveDoc,
            isDocMandatery,
            numberOfDays,
            isApproved,
            actionTakenBy,
            managers,
            status,empID:empID, companyID:companyID, branchID:branchID,departmentID:departmentID});
    
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
  //----employeeBranchModel--    
  export const employeeBranch = [
    validateAuthKey,
    async (req, res) => {
      // const { id } = req.user;
       const { companyID } = req.user;
       const { empID } = req.user;
       const { branchID } = req.user;
       const { departmentID } = req.user;
      //   console.log(id)
      //console.log(req.user)
  
      try {
        const {empID,branchID, departmentID,  hasAccess,
          
         } = req.body
        console.log(req.user)
        // if (!leaveStartDate || !leaveEndDate) {
  
        //   return res.status(401).json({ message: "All fields are mandatory" });
  
        // }
  
        // const user = await empLeaveModel.create({empID, branchID,departmentID, hasAccess});
        const result = new branchModel({
          empID:empID,
          branchID:branchID,
          departmentID: departmentID,
          hasAccess:hasAccess,
          
    
        })
        result.save()
        .then(emp => {
          res.json({
            emp
            // _id: emp._id,
            // companyID: emp.companyID,
            // branchID: emp.branchID,
            // hasAccess: emp.hasAccess,
            // empID: emp.empID,
  
  
          });
          })
  
        // if (user) {
  
        //   return res.json({
        //     _id: user._id,
        //     companyID: user.companyID,
        //     branchID: user.branchID,
        //     name: user.name,
  
  
        //   });
        // }
      } catch (err) {
        console.log(err);
      }
  
  
    }]; 
     

import jwt from "jsonwebtoken";
import moment from "moment/moment.js";
import { validateAuthKey, validateAdmin } from '../../middleware/jwtMiddleware.js';
import leaveModel from "../../Models/leaveTypeModel.js";
import empleaveModel from "../../Models/employeeLeaveModel.js";


export const createLeave = [
    validateAuthKey,
    async (req, res) => {
      const { id } = req.user;
      const { companyID } = req.user;
    //   console.log(id)
      console.log(req.user)
    
      try {
        const { name, noOfLeave,branchID} = req.body
        console.log(req.user)
        if (!name || !noOfLeave) {
  
          return res.status(401).json({ message: "All fields are mandatory" });
  
        }
        
      
        const user = await leaveModel.create({name,noOfLeave,branchID,companyID:companyID,createdBy:id

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

   export const leaveAndreject = [
    validateAuthKey,
      async (req, res) => {
        const { id } = req.user;
        console.log(id)
       const idd= req.body.id
    
    
        try {
          let updateEmp = {};
          updateEmp = req.body;
          console.log(updateEmp, "ww88ww")
    
    
          const user = await empleaveModel.findByIdAndUpdate(idd,
           {status: req.body.status,
            actionTakenBy:id
          }, 
          
            { new: true });
           if(user){
            return res.status(200).json({
              success: true,
              user,
            });
           }else{
            return res.status(200).json({
              success: false,
             
            });
           }
          
    
        } catch (err) {
          console.log(err);
        }
    
    
      }];  
export const getAllLeave =[
   validateAuthKey,
       async (req, res) => {
        const { id } = req.user;
        console.log(id)
        const st=req.body.status;
      
        try {
          const results = await empleaveModel.find({emp_ID:id,status:st});
          // console.log(results[0].leaveStartDate)
          // console.log(results[0].leaveEndDate)

          // var a = moment(results[0].leaveEndDate);//now
          // var b = moment(results[0].leaveStartDate);

          // const dfff=a.diff(b, 'minute') // 44700
          // console.log(dfff%60)
          // console.log(a.diff(b, 'hours')) // 745
          // console.log(a.diff(b, 'days')) // 31
          // console.log(a.diff(b, 'weeks')) // 4
          // const day=a.diff(b, 'days')

         if(results){
          return res.json({results})
         }
        } catch (err) {
          throw err;
        }
     
      }]          
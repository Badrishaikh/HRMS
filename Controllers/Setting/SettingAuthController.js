import settingModel from "../../Models/settingModel.js";
import { validateAuthKey, validateAdmin } from '../../middleware/jwtMiddleware.js';
import TimersettingModel from "../../Models/timerSettingModel.js";
import AttendanceTimersettingModel from "../../Models/attendanceTime.js";
export const createSandwichLeave = [
    validateAuthKey,
    async (req, res) => {
      
      const { id } = req.user;
      const { companyID } = req.user;
      const { empID } = req.user;
      const { branchID } = req.user;
      const { departmentID } = req.user;
      try {
        const { key,value,isActive} = req.body
        console.log(req.user)
        // if (!sandwichLeaveDays) {
  
        //   return res.status(401).json({ message: "All fields are mandatory" });
  
        // }
      
        const user = await settingModel.create({ key,value,isActive,createdBy:id,companyID:companyID,branchID:branchID});
  
        if (user) {
  
          return res.json({
            _id: user._id,
            key: user.key,
            companyID: user.companyID,
            branchID: user.branchID,
            value: user.value,
            });
        }
      } catch (err) {
        console.log(err);
      }
  
  
    }];

    export const createBreakTimer = [
      validateAuthKey,
      async (req, res) => {
        
        const { id } = req.user;
        const { companyID } = req.user;
        const { empID } = req.user;
        const { branchID } = req.user;
        const { departmentID } = req.user;
        try {
          const { key,value} = req.body
          console.log(req.user)
          // if (!sandwichLeaveDays) {
    
          //   return res.status(401).json({ message: "All fields are mandatory" });
    
          // }
        
          const user = await TimersettingModel.create({ key,value,createdBy:id,companyID:companyID,branchID:branchID});
    
          if (user) {
    
            return res.json({
              _id: user._id,
              key: user.key,
              companyID: user.companyID,
              branchID: user.branchID,
              value: user.value,
              });
          }
        } catch (err) {
          console.log(err);
        }
    
    
      }];    

      export const createAttendanceTimer = [
        validateAuthKey,
        async (req, res) => {
          
          const { id } = req.user;
          const { companyID } = req.user;
          const { empID } = req.user;
          const { branchID } = req.user;
          const { departmentID } = req.user;
          try {
            const { entrytype,time,status} = req.body
            console.log(req.user)
            // if (!sandwichLeaveDays) {
      
            //   return res.status(401).json({ message: "All fields are mandatory" });
      
            // }
         
            const user = await AttendanceTimersettingModel.create({ entrytype,time,status,createdBy:id,companyID:companyID,branchID:branchID});
      
            if (user) {
      
              return res.json({
                _id: user._id,
                key: user.key,
                companyID: user.companyID,
                branchID: user.branchID,
                value: user.value,
                });
            }
          } catch (err) {
            console.log(err);
          }
      
      
        }];
        
 export const getAttendanceTimer =[
   validateAuthKey,
       async (req, res) => {
        const { id } = req.user;
        const { companyID } = req.user;
        const st=req.body.status;
      
        try {
          const results = await AttendanceTimersettingModel.find({companyID:companyID});

         if(results){
          return res.json({results})
         }
        } catch (err) {
          throw err;
        }
     
      }]        
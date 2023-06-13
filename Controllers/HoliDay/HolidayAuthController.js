import { validateAuthKey, validateAdmin } from '../../middleware/jwtMiddleware.js';
import holidayModel from "../../Models/holidayModel.js";
export const holiDay = [
    validateAuthKey,
    async (req, res) => {
       const { id } = req.user;
       const { companyID } = req.user;
       const { empID } = req.user;
       const { branchID } = req.user;
       const { departmentID } = req.user;
      //   console.log(id)
      //console.log(req.user)
  
      try {
        const { branchID, createdBy,  startDate,
            endDate,
            numOfDays,
            isLeaveApplicable,
         } = req.body
        console.log(req.user)
        // if (!leaveStartDate || !leaveEndDate) {
  
        //   return res.status(401).json({ message: "All fields are mandatory" });
  
        // }
  
        const user = await holidayModel.create({companyID:companyID,branchID, createdBy,  startDate,
            endDate,
            numOfDays,
        isLeaveApplicable,
         });
  
        if (user) {
  
          return res.json({
            _id: user._id,
            companyID: user.companyID,
            branchID: user.branchID,
            createdBy: user.createdBy,
            startDate: user.startDate,
            endDate: user.endDate,
            numOfDays: user.numOfDays,
            isLeaveApplicable: user.isLeaveApplicable,
  
  
          });
        }
      } catch (err) {
        console.log(err);
      }
  
  
    }];
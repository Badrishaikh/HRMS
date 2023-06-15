import settingModel from "../../Models/settingModel.js";
import { validateAuthKey, validateAdmin } from '../../middleware/jwtMiddleware.js';
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
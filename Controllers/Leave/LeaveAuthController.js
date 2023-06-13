import jwt from "jsonwebtoken";
import { validateAuthKey, validateAdmin } from '../../middleware/jwtMiddleware.js';
import leaveModel from "../../Models/leaveTypeModel.js";
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

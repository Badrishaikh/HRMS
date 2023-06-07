import settingModel from "../../Models/settings.js";
import { validateAuthKey, validateAdmin } from '../../middleware/auth.js';
export const createSandwichLeave = [
    validateAuthKey,
    async (req, res) => {
      const { id } = req.user;
      const { cId} = req.user;
      console.log(cId)
      try {
        const { key,value } = req.body
        console.log(req.user)
        // if (!sandwichLeaveDays) {
  
        //   return res.status(401).json({ message: "All fields are mandatory" });
  
        // }
      
        const user = await settingModel.create({ key,value,cId: cId });
  
        if (user) {
  
          return res.json({
            _id: user._id,
            key: user.key,
            cId: user.cId,
            value: user.value,
            });
        }
      } catch (err) {
        console.log(err);
      }
  
  
    }];

    
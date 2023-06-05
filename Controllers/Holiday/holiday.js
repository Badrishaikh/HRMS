import holidayModel from "../../Models/holiday.js";
import { validateAuthKey, validateAdmin } from '../../middleware/auth.js';
export const createHolidays = [
  validateAuthKey,
  async (req, res) => {
    const { id } = req.user;
    const { cId } = req.user;
    console.log(cId)
    console.log(id, "kikff")
    try {
      const { title, start, end, nOfDay, event_date } = req.body

      if (!title || !start || !end || !nOfDay || !event_date) {

        return res.status(401).json({ message: "All fields are mandatory" });

      }
      //   const userExist = await hrModel.findOne({ email });
      //   if (userExist) {

      //     return res.json({ message: "email id already exists" });
      //   }
      const user = await holidayModel.create({ title, start, end, nOfDay, event_date, cId: cId });

      if (user) {

        return res.json({
          _id: user._id,
          title: user.title,
          start: user.start,
          end: user.end,
          nOfDay: user.nOfDay,
          event_date: user.event_date,
          //isAdmin: user.isAdmin,

        });
      }
    } catch (err) {
      console.log(err);
    }


  }];

export const holidaylist = [
  validateAuthKey,

  async (req, res) => {
    const { id } = req.user;
    const { cId } = req.user;

    try {
      const results = await holidayModel.find({ cId: cId });
      if (results) {
        return res.json(results)
      }
    } catch (err) {
      throw err;
    }

  }]



export const holiday = [
  validateAuthKey,

  async (req, res) => {
    const { id } = req.user;
    const { cId } = req.user;

    try {
      const results = await holidayModel.find({ cId: id });
      if (results) {
        return res.json(results)
      }
    } catch (err) {
      throw err;
    }

  }]   
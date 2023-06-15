import jwt from "jsonwebtoken";
import moment from "moment/moment.js";
import empModel from "../../Models/employeeModel.js";
import empLeaveModel from "../../Models/employeeLeaveModel.js";
import branchModel from "../../Models/employeeBranchModel.js";
import attendanceModel from "../../Models/attendanceModel.js"
import { validateAuthKey, validateAdmin } from '../../middleware/jwtMiddleware.js';
import empleaveModel from "../../Models/employeeLeaveModel.js";
import settingModel from "../../Models/settingModel.js";

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
      companyID: user.companyID,
      empID: user.empID,
      userType: user.userType,
      branchID: user.branchID,
      departmentID: user.departmentID,

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
    const location = req.body.locId
    try {
      const { name, email, password, primaryemail, countryCode, mobile, doj, dob, isWorkingToday,
        todayLoginTime,
        userType,
        employmentType,
        locId,
        reportingManager,
        branchID,
        departmentID
      } = req.body
      console.log(req.user)
      if (!name || !email || !password) {

        return res.status(401).json({ message: "All fields are mandatory" });

      }
      const userExist = await empModel.findOne({ email });
      if (userExist) {

        return res.json({ message: "empId already exists" });
      }

      let empcount = await empModel.find().count()
      var LOC = location;
      let cdate = new Date();
      let year1 = parseInt(cdate.getFullYear());
      let year = parseInt(cdate.getFullYear().toString().substring(2, 4));
      let month = cdate.getMonth() + 1;
      let serialNo = `SGC/${LOC}${year1 - 1}${year}/${empcount + 1}`;
      if (month > 3) {
        serialNo = `SGC/${LOC}${year1}${year + 1}/${empcount + 1}`;
      }

      const user = await empModel.create({
        name, email, password, primaryemail, countryCode, mobile, doj,
        dob,
        isWorkingToday,
        todayLoginTime,
        userType,
        employmentType,
        locId,
        reportingManager,
        branchID,
        departmentID,
        empID: serialNo,
        companyID: companyID,
        creatorId: id

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
    const { id } = req.user;
    const { companyID } = req.user;
    const { empID } = req.user;
    const { branchID } = req.user;
    const { departmentID } = req.user;
    //   console.log(id)
    //console.log(req.user)

    try {
      const { leaveTypeID, leaveReason, leaveStartDate, leaveEndDate,
        leaveDoc,
        isDocMandatery,
        isApproved,
        actionTakenBy,
        managers,
        status
      } = req.body
      console.log(req.user)
      // if (!leaveStartDate || !leaveEndDate) {

      //   return res.status(401).json({ message: "All fields are mandatory" });

      // }
      var setting = await settingModel.findOne({ key: "sandwichLeaveStatus" });
      var sandwichLeaveStatus = false;
      if (setting) {
        sandwichLeaveStatus = setting.value.status || false;
        console.log(sandwichLeaveStatus, "kjsus");

      }
      var numOfDays = 1;
      var dateone = new Date(leaveStartDate)
      var datetw = new Date(leaveEndDate)
      console.log(datetw, "jkjsjs")
      //var test= Datetime(datetw)
      //console.log(test)
      while (dateone < datetw) {
        numOfDays++;
        if (dateone.getDay() == 0) {
          if (sandwichLeaveStatus == true) {

          } else {
            numOfDays--;
          }


        }
        dateone.setDate(dateone.getDate() + 1);

      }
      //  -----

      const user = await empLeaveModel.create({
        leaveTypeID, leaveReason, leaveStartDate, leaveEndDate,
        leaveDoc,
        isDocMandatery,
        numberOfDays: numOfDays,
        isApproved,
        actionTakenBy,
        managers,
        status, emp_ID: id, companyID: companyID, branchID: branchID, departmentID: departmentID
      });

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
      const { emp_ID, branchID, departmentID, hasAccess,

      } = req.body
      console.log(req.user)
      // if (!leaveStartDate || !leaveEndDate) {

      //   return res.status(401).json({ message: "All fields are mandatory" });

      // }

      // const user = await empLeaveModel.create({empID, branchID,departmentID, hasAccess});
      const result = new branchModel({
        emp_ID: emp_ID,
        branchID: branchID,
        departmentID: departmentID,
        hasAccess: hasAccess,


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

//----AttendanceModel---
export const employeeAttendance = [
  validateAuthKey,
  async (req, res) => {
    const { id } = req.user;
    const { companyID } = req.user;
    const { emp_ID } = req.user;
    const { branchID } = req.user;
    const { departmentID } = req.user;
    //   console.log(id)
    //console.log(req.user)

    try {
      const { entryType } = req.body
      console.log(req.user)
      // if (!leaveStartDate || !leaveEndDate) {

      //   return res.status(401).json({ message: "All fields are mandatory" });

      // }

      // const user = await empLeaveModel.create({empID, branchID,departmentID, hasAccess});
      const result = new attendanceModel({
        emp_ID: id,
        branchID: branchID,
        departmentID: departmentID,
        companyID: companyID,
        entryType: entryType,


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
export const getAttendance = [
  validateAuthKey,
  async (req, res) => {
    const { id } = req.user;
    let dt = new Date();
    let today = dt.getFullYear() + "-" + (dt.getMonth() + 1).toString().padStart(2, '0') + "-" + dt.getDate().toString().padStart(2, '0');
    dt.setDate(dt.getDate() + 1)
    let nextDay = dt.getFullYear() + "-" + (dt.getMonth() + 1).toString().padStart(2, '0') + "-" + dt.getDate().toString().padStart(2, '0');



    try {
      const results = await attendanceModel.find({
        emp_ID: id,
        createdAt: {
          $gt: new Date(today + "T00:00:00"),
          $lt: new Date(nextDay + "T00:00:00"),
        },
      }).sort({ createdAt: 1 });

      // console.log(results[0].leaveStartDate)
      // console.log(results[0].leaveEndDate)

      // var a = moment(results[0].createdAt);//now
      // console.log(a)
      // var b = moment(results[0].leaveStartDate);

      // const dfff=a.diff(b, 'minute') // 44700
      // console.log(dfff%60)
      // console.log(a.diff(b, 'hours')) // 745
      // console.log(a.diff(b, 'days')) // 31
      // console.log(a.diff(b, 'weeks')) // 4
      // const day=a.diff(b, 'days')
      //  for(var i=1;i<=results.length;i++){
      //    console.log(results[i].entryType,"testing....")

      //  }
      let relustObj = [];
      for (let i = 0; i < results.length; i++) {
        const element = {...results[i]._doc};
        console.log(element);
        if (element.entryType == "OfficeIN") {
          let timeStamp = new Date();
          if (results[results.length - 1].entryType == "OfficeOFF") {
            timeStamp = results[results.length - 1].createdAt;
          }
          let workingHours = calculateTimeDiff(new Date(element.createdAt), timeStamp);
          element.createdAt = moment(element.createdAt).format('MMMM Do YYYY, h:mm:ss a');
          element.updatedAt = moment(element.updatedAt).format('MMMM Do YYYY, h:mm:ss a');
          element.endTime = moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a');
          relustObj.push({...element,timeSpent:workingHours})
          console.log("hello");
        }else if (element.entryType == "BreakON") {
          let timeStamp = new Date();
          if(results[i+1])
          if (results[i+1].entryType == "BreakOFF") {
            timeStamp = results[i+1].createdAt;
          }
          let workingHours = calculateTimeDiff(new Date(element.createdAt), timeStamp);
          element.createdAt = moment(element.createdAt).format('MMMM Do YYYY, h:mm:ss a');
          element.updatedAt = moment(element.updatedAt).format('MMMM Do YYYY, h:mm:ss a');
          element.endTime = moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a');
          relustObj.push({...element,timeSpent:workingHours })
          console.log("hello");
        }
        else if (element.entryType == "LunchON") {
          let timeStamp = new Date();
          if(results[i+1])
          if (results[i+1].entryType == "LunchOFF") {
            timeStamp = results[i+1].createdAt;
          }
          let workingHours = calculateTimeDiff(new Date(element.createdAt), timeStamp);
          element.createdAt = moment(element.createdAt).format('MMMM Do YYYY, h:mm:ss a');
          element.updatedAt = moment(element.updatedAt).format('MMMM Do YYYY, h:mm:ss a');
          element.endTime = moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a');
          relustObj.push({...element,timeSpent:workingHours })
          console.log("hello");
        }else if (element.entryType == "OfficeOFF") {
          let timeStamp = new Date();
          if (results[0].entryType == "OfficeIN") {
            timeStamp = results[0].createdAt;
          }
         
          let workingHours = calculateTimeDiff(timeStamp,new Date(element.createdAt));
          element.createdAt = moment(element.createdAt).format('MMMM Do YYYY, h:mm:ss a');
          element.updatedAt = moment(element.updatedAt).format('MMMM Do YYYY, h:mm:ss a');
          element.endTime = moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a');
          relustObj.push({...element,timeSpent:workingHours})
          console.log("hello");
        }
      }

      if (relustObj) {
        return res.json({ withWorkingHour:relustObj , listAll:results})
      }
    } catch (err) {
      throw err;
    }

  }]




export const calculateTimeDiff = (time1, time2) => {
  let startDt = time1
  let curreDt = time2;
  const startTime = startDt.getTime();
  const endTime = curreDt.getTime();
  const diff = endTime - startTime;
  const timeInminutes = Math.ceil((diff / 1000) / 60);
  return timeInminutes
}
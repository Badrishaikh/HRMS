import mongoose from "mongoose";
import bcrypt from "bcrypt";
// import Inc from "mongoose-sequence";
// const AutoIncrement = Inc(mongoose);

var employeeSchema = new mongoose.Schema({
  companyID: { type: mongoose.Schema.Types.ObjectId },
   branchID: { type: mongoose.Schema.Types.ObjectId },
   departmentID: { type: mongoose.Schema.Types.ObjectId },
  // branchID:String,
  // departmentID:String ,

  name: String, 
  empID: String, 
  email: String,
  primaryemail: String,
  countryCode: String,
  mobile: String,
  password: String,
  doj: Number,
  dob: Number,
  anniversary: Number,
  dateOfResign: Number,
  isResigned: Boolean,
  isWorkingToday: Boolean,
  todayLoginTime: Number,
  userType: String,
  employmentType:String,
  totalLeaveCount:Number,
  creatorId:{ type: mongoose.Schema.Types.ObjectId },
  //creatorId:String,
 locId:String,
  resetToken:String,
  // password:String,
  // reportingManager: { type: mongoose.Schema.Types.ObjectId },
  reportingManager:String,
  createdAt:Number,
  updatedAt:Number,
 
})

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
//   userSchema.methods.getJwtToken = function () {
//     return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY,{
//       expiresIn: process.env.JWT_EXPIRES,
//     });
//   };

// compare password
employeeSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Employee",employeeSchema)
// employeeSchema.plugin(AutoIncrement,{inc_field: 'id'});


// userType
// SuperAdmin
// Admin
// BranchAdmin
// Manager
// Hr,
// Staff,
// Employee



import mongoose from "mongoose";
// import Inc from "mongoose-sequence";
// const AutoIncrement = Inc(mongoose);

var companySchema = new mongoose.Schema({
  name: String,
  email: String,
  countryCode: String,
  mobile: String,
  address: String,
  noOfEmp: Number,
  shortCode: String,
  website: String,
  password:String,
  resetToken:String,
  resetPasswordToken:{
    type: String,
  },

  //ownerID: { type: mongoose.Schema.Types.ObjectId },
  person:{
    fname:{
      type:String
    },
    lname:{
      type:String
    },
    mobile:{
      type:String
    },
    email:{
      type:String
    },
    gender:{
      type:String
    },
    dateOfBirth:{
      type:String
    },
    designation:{
      type:String
    },
  },
  oo:{
    type:Number
  },

},{ timestamps: true })



export default mongoose.model("company",companySchema)
// companySchema.plugin(AutoIncrement,{inc_field: 'oo'});


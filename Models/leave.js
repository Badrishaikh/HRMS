import mongoose from "mongoose"
const UserSchema= new  mongoose.Schema({
    leaveType: {
     type: String
    },
  fromDate:{
     type: Date
     },
  toDate: { 
    type: Date
 },
  reasonforLeave: {
     type:String 
    },
    numOfDays: {
      type:Number 
     }, 
  status: {
     type: String,
     default:"pending",
     },
     empId: {
        type: String
     
        },
    cId: {
     type: String
         
     },    
     
},
{ timestamps: true })
export default mongoose.model("leave",UserSchema)
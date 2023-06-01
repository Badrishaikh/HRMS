import mongoose from "mongoose"
const UserSchema= new  mongoose.Schema({
    email:{
        type:String
    },
      password:{
        type:String
    },
    is_hrms:{
        type:Boolean,
        default:true
    },
},
{ timestamps: true })
export default mongoose.model("HRM",UserSchema)
import mongoose from "mongoose";
import bcrypt from "bcrypt"
const UserSchema= new  mongoose.Schema({
    name:{
        type:String
    },
      email:{
        type:String
    },
    password:{
        type:String
    },
    contact_no:{
        type:String
    },
    addres:{
        type:String
    },
    is_hr:{
        type:String
    },
    cId:{
      type:String
  },
    cHR:{
        type:Boolean,
        default:true
    }, 
    avatar:{
      type: String
   },
},
{ timestamps: true })


UserSchema.pre("save", async function (next){
    if(!this.isModified("password")){
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
  UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  

export default mongoose.model("hr",UserSchema)
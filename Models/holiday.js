import mongoose from "mongoose"
const UserSchema= new  mongoose.Schema({
    title: {
     type: String
    },
    start: {
        type: Date,
        
     },
     end: {
        type: Date,
       
       
       },
    nOfDay: {
        type: String
    }, 
  status: {
     type: String,
     default:false,
     },
   
    cId: {
     type: String
     },  
     
     event_date:{
        type:Date
     }
     
},
{ timestamps: true })
export default mongoose.model("holiday",UserSchema)
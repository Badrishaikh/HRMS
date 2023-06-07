
import leaveModel from "../../Models/leave.js";
import settingModel from "../../Models/settings.js";
import { validateAuthKey, validateAdmin } from '../../middleware/auth.js';
export const leave= [
     validateAuthKey,
    async (req, res) => {
      const { id } = req.user;
      const { cId} = req.user;
      console.log(req.user)
      try {
        const { leaveType, fromDate, toDate, reasonforLeave} = req.body
        console.log(req.user)
        // if (!leaveType || !fromDate || !toDate || !reasonforLeave) {
  
        //   return res.status(401).json({ message: "All fields are mandatory" });
  
        // }
        var setting = await settingModel.findOne({ key:"sandwichLeaveStatus" });
        var sandwichLeaveStatus=false;
        if(setting){
            sandwichLeaveStatus=setting.value.status || false;
            console.log(sandwichLeaveStatus,"kjsus");

        }
        var numOfDays=1;
        var dateone=new Date(fromDate)
        var datetw=new Date(toDate)
        console.log(datetw,"jkjsjs")
         //var test= Datetime(datetw)
         //console.log(test)
        while(dateone<datetw){
            numOfDays++;
            if(dateone.getDay()==0){
                if(sandwichLeaveStatus==true){

                }else{
                    numOfDays--;
                }


            }
           dateone.setDate(dateone.getDate()+1);

        }
        const user = await leaveModel.create({leaveType,numOfDays,fromDate,toDate,reasonforLeave, empId:id, cId:cId });
        
        if(user){
      
          return  res.json({numOfDays})


        }
       
       
     

      
      } catch (err) {
        console.log(err);
      }
  
  
    }];  

    export const leave1= [
      validateAuthKey,
     async (req, res) => {
       const { id } = req.user;
       const { cId} = req.user;
       console.log(req.user)
       try {
         const { leaveType, fromDate, toDate, reasonforLeave} = req.body
         console.log(req.user)
         // if (!leaveType || !fromDate || !toDate || !reasonforLeave) {
   
         //   return res.status(401).json({ message: "All fields are mandatory" });
   
         // }
         var setting = await settingModel.findOne({ key:"sandwichLeaveStatus" });
         var sandwichLeaveStatus=false;
         if(setting){
             sandwichLeaveStatus=setting.value.status || false;
             console.log(sandwichLeaveStatus,"kjsus");
 
         }
         var numOfDays=1;
         var dateone=new Date(fromDate)
         var datetw=new Date(toDate)
         console.log(datetw,"jkjsjs")
          //var test= Datetime(datetw)
          //console.log(test)
         while(dateone<datetw){
             numOfDays++;
             if(dateone.getDay()==0){
                 if(sandwichLeaveStatus==true){
 
                 }else{
                     numOfDays--;
                 }
 
 
             }
            dateone.setDate(dateone.getDate()+1);
 
         }
         const user = await leaveModel.create({leaveType,numOfDays,fromDate,toDate,reasonforLeave, empId:id, cId:cId });
         
         if(user){
         var data=numOfDays/2;
           return  res.json({data})
 
 
         }
        
        
      
 
       
       } catch (err) {
         console.log(err);
       }
   
   
     }];     
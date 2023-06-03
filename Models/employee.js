import mongoose from "mongoose";
import bcrypt from "bcrypt"
const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  contact_no: {
    type: String
  },
  addres: {
    type: String
  },
  cId: {
    type: String
  },
//   cId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "company"
//  },
  empId: {
    type: String
  },
  empleave: {
    type: String
  },
  is_emp: {
    type: Boolean,
    default: true
  },
  avatar: {
    type: String
  },
  cancel_cheque: {
    type: String
  },
  pan_img: {
    type: String
  },
  bankdetails: [
    {
      bank_name: {
        type: String,
      },
      branch_name: {
        type: String,
      },
      beneficiary_name: {
        type: String,
      },
      ifsc_code: {
        type: String,
      },
    }
  ],
  edu_details: [
    {
      degree: {
        type: String,
      },
      stream: {
        type: String,
      },
      university_name: {
        type: String,
      },
      roll: {
        type: String,
      },
      yofpassing: {
        type: String,
      },
    }
  ],
  personal_docs: [
    {
      id_Proof: {
        type: String,
      },
      pan_no: {
        type: String,
      },
      adress_Proof: {
        type: String,
      },
      radhar_cardno: {
        type: String,
      },
      yofpassing: {
        type: String,
      },
    }
  ],
  job_details: [
    {
      emp_id: {
        type: String,
      },
      joining_date: {
        type: String,
      },
      designation: {
        type: String,
      },
      provisional_period: {
        type: String,
      },

    }
  ],
},
  { timestamps: true })


UserSchema.pre("save", async function (next) {
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
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


export default mongoose.model("employee", UserSchema)
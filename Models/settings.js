import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
    key: {
        type: String
    },
    value: {
        type: Object,

    },

    cId: {
        type: String

    },

},
    { timestamps: true })
export default mongoose.model("setting", UserSchema)
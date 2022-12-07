const mongoose = require("mongoose")

const staffTypeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,

    },
    name: {
        type: String,
        required: true
    }
})
const StaffType = mongoose.model("StaffType" , staffTypeSchema)
module.exports = StaffType
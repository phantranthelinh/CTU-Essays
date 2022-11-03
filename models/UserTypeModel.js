const mongoose = require("mongoose")

const userTypeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,

    },
    name: {
        type: String,
        required: true
    }
})
const UserTypes = mongoose.model("UserTypes" , userTypeSchema)
module.exports = UserTypes
const mongoose = require("mongoose")

const addressSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    address:{
        type: String,
        required: true,
    }
},
{
    timestamp: true,
})

const Address = mongoose.model("Address", addressSchema)
module.exports = Address
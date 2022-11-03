const mongoose = require("mongoose")

const importDetailSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    price: {
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    qty:{
        type: Number,
        required: true,
    },
},
{
    timestamp: true,
})

const ImportDetail = mongoose.model("ImportDetail", importDetailSchema)
module.exports = ImportDetail
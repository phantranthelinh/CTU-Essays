const mongoose = require('mongoose');

const importProductSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
},
{
    timestamps: true,
})
const ImportProduct = mongoose.model("ImportProduct", importProductSchema)
module.exports = ImportProduct
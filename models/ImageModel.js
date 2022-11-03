const mongoose = require("mongoose")
const imageSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    base64: {
        type: String,
    }
})
const ImageProduct = mongoose.model("ImageProduct", imageSchema);

module.exports = ImageProduct
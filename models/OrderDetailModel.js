const mongoose = require('mongoose');

const orderDetailSchema = mongoose.Schema({
    productId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
    name: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true,
    }
},{ 
    timestamp: true,
})

const OrderDetail = mongoose.model("OderDetail", orderDetailSchema)
module.exports = OrderDetail
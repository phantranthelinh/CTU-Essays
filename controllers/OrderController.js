const Order = require("../models/OrderModel");
const OrderDetail = require("../models/OrderDetailModel");

const asyncHandler = require("express-async-handler");

module.exports = {
  // CREATE ORDER
  create: asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = req.body;


    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("Không có sản phẩm trong đơn đặt hàng");
    } else {
      const newOrderDetail = new OrderDetail({
        orderItems,
        shippingAddress,
        itemsPrice,
        paymentMethod,
        shippingPrice,
        totalPrice,
      })
      const savedOrderDetail = await newOrderDetail.save()
      const newOrder = new Order({
        user: req.user._id,
        orderDetails: savedOrderDetail._id
      });
       await newOrder.save();

    
      res.status(200).json({message:"Đặt hàng thành công"});
    }
  }),
  //ORDER DETAILS
  detail: asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    ).populate({path: "orderDetails"});

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error("Không tìm thấy đơn đặt hàng");
    }
  }),

  adminGetAllOrder: asyncHandler(async (req, res) => {
    const orders = await Order.find({})
      .sort({ _id: -1 })
      .populate("user", "id name email");
    res.json(orders);
  }),


  deleteAllOrder: asyncHandler(async (req, res) => {
    await Order.deleteMany({});
    res.status(200).json("Xoá tất cả đơn đặt hàng thành công");
  }),
  isDelivered: asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updateOrder = await order.save();
      res.json(updateOrder);
    } else {
      res.status(404);
      throw new Error("Không tìm thấy đơn đặt hàng");
    }
  }),
};


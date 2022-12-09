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
      });
      const savedOrderDetail = await newOrderDetail.save();
      const newOrder = new Order({
        user: req.user._id,
        orderDetails: savedOrderDetail._id,
      });
      const savedOrder = await newOrder.save();

      res
        .status(200)
        .json({
          message: "Đặt hàng thành công",
          _id: savedOrder._id,
          user: savedOrder.user,
          orderDetails: savedOrder.orderDetails,
        });
    }
  }),
  //ORDER DETAILS
  detail: asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate({ path: "orderDetails" });

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
      .populate("user", "id name email")
      .populate({ path: "orderDetails" });
    res.json(orders);
  }),

  deleteAllOrder: asyncHandler(async (req, res) => {
    await Order.deleteMany({});
    res.status(200).json("Xoá tất cả đơn đặt hàng thành công");
  }),
  isDelivered: asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    const orderDetail = await OrderDetail.findById(order.orderDetails)

    if (order) {
      orderDetail.isDelivered = true;
      orderDetail.deliveredAt = Date.now();

     await orderDetail.save();
      res.json({message: "Cập nhật thành công", orderDetail});
    } else {
      res.status(400);
      throw new Error("Không tìm thấy đơn đặt hàng");
    }
  }),
};

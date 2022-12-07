const User = require("../models/UserModel");
const Address = require("../models/AddressModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
module.exports =  {
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        address: user.address,
        phone: user.phone,
        token: generateToken(user._id),
        createAt: user.createdAt,
      });
    } else {
      res.status(200);
      throw new Error("Sai tài khoản hoặc mật khẩu");
    }
  }),
  register: asyncHandler(async (req, res) => {
    const { name, email, password, phone, address } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("Tài khoản đã tồn tại");
    }
    const user = new User({
      name,
      email,
      password,
      phone,
    });
    await user.save();
    const addressCreated = new Address({
      userId: user._id,
      address: address
    })
    const addressSaved= await addressCreated.save()
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createAt: user.createdAt,
        address: addressSaved.address
      });
    } else {
      res.status(400);
      throw new Error("Dữ liệu chưa đúng định dạng");
    }
  }),
  get: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate({path: "address" , select: "address"});
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isAdmin: user.isAdmin,
        createAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("Không tìm thấy người dùng");
    }
  }),

  //UPDATE PROFILE
  update: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      if(req.body.address){
        user.address.push(req.body.address)
      }
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        isAdmin: updatedUser.isAdmin,
        createAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("Không tìm thấy người dùng");
    }
  }),
  getAll: asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
  }),
};


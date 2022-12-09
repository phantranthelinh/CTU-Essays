const Staff = require("../models/StaffModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
module.exports = {
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const staff = await Staff.findOne({ email }).populate({path: "staffType"});
    if (staff && (await staff.matchPassword(password))) {
      res.json({
        _id: staff._id,
        name: staff.name,
        email: staff.email,
        token: generateToken(staff._id),
        staffType: staff.staffType,
      });
    } else {
      res.status(200);
      throw new Error("Sai tài khoản hoặc mật khẩu");
    }
  }),
  add: asyncHandler(async (req, res) => {
    const { name, email, password, staffType } = req.body;
    const staffExist = await Staff.findOne({ email });
    if (staffExist) {
      res.status(400);
      throw new Error("Tài khoản đã tồn tại");
    }
    const createdStaff = new Staff({
      name,
      email,
      password,
      staffType,
    });
    const savedStaff = await createdStaff.save();
    if (Staff) {
      res.status(200).json({
        _id: savedStaff._id,
        name: savedStaff.name,
        email: savedStaff.email,
        staffType: savedStaff.staffType,
        message: "Thêm mới thành công",
      });
    } else {
      res.status(400);
      throw new Error("Dữ liệu chưa đúng định dạng");
    }
  }),
  get: asyncHandler(async (req, res) => {
    const staff = await Staff.findById(req.params.id).populate({
      path: "staffType",
      select: "name userId",
    });
    if (staff) {
      res.status(200).json(staff);
    } else {
      res.status(404);
      throw new Error("Không tìm thấy nhân viên");
    }
  }),

  update: asyncHandler(async (req, res) => {
    const staff = await Staff.findById(req.params.id).populate({
      path: "staffType",
      select: "name userId",
    });
    if (staff) {
      staff.name = req.body.name || staff.name;
      staff.email = req.body.email || staff.email;
      staff.staffType = req.body.staffType || staff.staffType;
      staff.password = req.body.password || staff.password;

      const updatedStaff = await staff.save();
      res.json({
        _id: updatedStaff._id,
        name: updatedStaff.name,
        email: updatedStaff.email,
        staffType: updatedStaff.staffType,
        message: "Cập nhật thành công",
      });
    } else {
      res.status(404);
      throw new Error("Không tìm thấy nhân viên");
    }
  }),
  getAll: asyncHandler(async (req, res) => {
    const staffs = await Staff.find({}).populate({
      path: "staffType",
      select: "name userId",
    });
    res.json(staffs);
  }),
  delete: asyncHandler(async (req, res) => {
     await Staff.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "Xóa thành công"});
  }),
};

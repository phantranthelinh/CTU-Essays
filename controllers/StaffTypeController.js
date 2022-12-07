const StaffType = require("../models/StaffTypeModel");
const asyncHandler = require("express-async-handler");
module.exports = {
  add: asyncHandler(async (req, res) => {
    const { name } = req.body;
    const staffTypeExist = await StaffType.findOne({ name });
    if (staffTypeExist) {
      res.status(400);
      throw new Error("Chức vụ nhân viên đã tồn tại");
    }
    const newStaffType = new StaffType({
      name,
    });
    const createdStaffType =await newStaffType.save();
    if (createdStaffType) {
      res.status(200).json({
        _id: createdStaffType._id,
        name: createdStaffType.name,
        message: "Thêm chức vụ nhân viên thành công",
      });
    } else {
      res.status(400);
      throw new Error("Dữ liệu chưa đúng định dạng");
    }
  }),
  get: asyncHandler(async (req, res) => {
    const staffType = await StaffType.findById(req.params.id);
    if (staffType) {
      res.json({
        _id: staffType._id,
        name: staffType.name,
      });
    } else {
      res.status(404);
      throw new Error("Không tìm thấy chức vụ nhân viên");
    } 
  }),
  update: asyncHandler(async (req, res) => {
    const staffType = await StaffType.findById(req.params.id);
    if (staffType) {
      staffType.name = req.body.name || staffType.name;

      const updatedStaffType = await staffType.save();
      res.json({
        _id: updatedStaffType._id,
        name: updatedStaffType.name,
        message: "Cập nhật thành công",
      });
    } else {
      res.status(404);
      throw new Error("Không tìm thấy chức vụ nhân viên");
    }
  }),
  getAll: asyncHandler(async (req, res) => {
    const staffTypes = await StaffType.find({});
    res.json({ staffTypes });
  }),
  delete: asyncHandler(async (req, res) => {
    const StaffTypes = await StaffType.findById({});
    res.json({ StaffTypes });
  }),
};

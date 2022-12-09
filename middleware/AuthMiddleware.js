const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel");
const Staff = require("../models/StaffModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      const staff =  await Staff.findById(decoded.id).select("-password")
      if(user) {
        req.user = user
      }else {
        req.user = staff
      }
      next();
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error("Not authorized , token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an Admin");
  }
};

module.exports = { protect, admin };

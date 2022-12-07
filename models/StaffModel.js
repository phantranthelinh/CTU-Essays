const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const staffSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    staffType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StaffType",
    },
  },
  {
    timestamps: true,
  }
);
// Login
staffSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Register
staffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;

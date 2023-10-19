const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const GreenGroupUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "хэрэглэгчийн нэрийг оруулна уу"],
  },
  password: {
    type: String,
    required: [true, "нууц үгээ оруулна уу"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "хэрэглэгчийн эрхийг оруулна уу"],
    // enum ni todorhoi textuudiin tsugluulga
    enum: ["greenGroupUser", "manager", "admin"],
    default: "greenGroupUser",
  },
  objID: {
    type: Number,
    required: [true, "object ID оруулна уу"],
  },
});

GreenGroupUserSchema.methods.getJsonWebToken = function () {
  const token = jwt.sign(
    { username: this.username, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRESIN,
    }
  );

  return token;
};

GreenGroupUserSchema.pre("save", async function (next) {
  // Нууц үг өөрчлөгдөөгүй бол дараачийн middleware рүү шилж
  if (!this.isModified("password")) next();

  // Нууц үг өөрчлөгдсөн
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

GreenGroupUserSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("GreenGroupUser", GreenGroupUserSchema);

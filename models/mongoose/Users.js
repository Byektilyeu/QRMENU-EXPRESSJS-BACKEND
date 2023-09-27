const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
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
    enum: ["manager", "admin"],
    default: "manager",
  },
  objID: {
    type: Number,
    required: [true, "object ID оруулна уу"],
  },
});

UserSchema.methods.getJsonWebToken = function () {
  const token = jwt.sign(
    { username: this.username, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRESIN,
    }
  );

  return token;
};

UserSchema.pre("save", async function (next) {
  // Нууц үг өөрчлөгдөөгүй бол дараачийн middleware рүү шилж
  if (!this.isModified("password")) next();

  // Нууц үг өөрчлөгдсөн
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// UserSchema.methods.generatePasswordChangeToken = function () {
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.reserPasswordExpire = Date.now() + 10 * 60 * 1000;

//   return resetToken;
// };

module.exports = mongoose.model("User", UserSchema);

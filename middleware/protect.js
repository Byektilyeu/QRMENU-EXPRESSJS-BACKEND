const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const MyError = require("../utils/myError");
const User = require("../models/sequelize/User");

exports.protect = asyncHandler(async (req, res, next) => {
  let token = null;

  console.log("+++++++++++++++++", req.headers);
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies) {
    token = req.cookies["amazon-token"];
    console.log(req.cookies);
  }

  if (!token) {
    throw new MyError(
      "Та эхлээд логин хийнэ үү, Auth shalgana uu,esvel cookie,  token damjuulj uguurei",
      401
    );
  }

  console.log("-------------", token);
  const tokenObj = jwt.verify(token, process.env.JWT_SECRET);
  console.log("-------------", tokenObj);

  req.userId = tokenObj.id;

  req.userRole = tokenObj.role;

  next();
});

exports.authorize = (...roles) => {
  return (req, res, next) => {
    //includes-eer massiv dotor baigaa esehiig shalgaj bna
    if (!roles.includes(req.userRole)) {
      throw new MyError(
        "Таны эрх [" + req.userRole + "] энэ үйлдлийг гүйцэтгэхэд хүрэлцэхгүй",
        403
      );
    }

    next();
  };
};

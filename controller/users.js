const asyncHandler = require("express-async-handler");

//Register
exports.register = asyncHandler(async (req, res, next) => {
  const user = await req.db.User.create(req.body);

  // const token = user.getJsonWebToken();

  res.status(200).json({
    success: true,
    // token,
    user: user,
  });
});

//login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //Oroltiigoo shalgana
  if (!email || !password) {
    throw MyError("Имэйл болон нууц үгээ дамжуулна уу", 400);
  }

  //Тухайн хэргэлэгчийг хайна
  const user = await req.body.User.findOne({ email })
    .select("+password")
    .populate("cart");

  if (!user) {
    throw new MyError("Имэйл болон нууц үгээ зөв оруулна уу", 401);
  }

  const ok = await user.checkPassword(password);

  if (!ok) {
    throw new MyError("Имэйл болон нууц үгээ зөв оруулна уу", 401);
  }

  const token = user.getJsonWebToken();

  const cookieOption = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    // zuvhun http protocoloor l damjigdana gesen tohirgoo. Jishee ni front taldaa clg hiigeed document.cookie-iig consoled gargah bolomjgui bolgoj bna gesen ug
    httpOnly: true,
  };

  res.status(200).cookie("token", token, cookieOption).json({
    success: true,
    token,
    user: user,
  });
});

// exports.logout = asyncHandler(async (req, res, next) => {
//   const cookieOption = {
//     expires: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
//     // zuvhun http protocoloor l damjigdana gesen tohirgoo. Jishee ni front taldaa clg hiigeed document.cookie-iig consoled gargah bolomjgui bolgoj bna gesen ug
//     httpOnly: true,
//   };

//   res.status(200).cookie("token", null, cookieOption).json({
//     success: true,
//     data: "logged out ...",
//   });
// });

// exports.getUsers = asyncHandler(async (req, res, next) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const sort = req.query.sort;
//   const select = req.query.select;

//   ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

//   //Pagination
//   const pagination = await paginate(page, limit, User);

//   const users = await User.find(req.query, select)
//     .sort(sort)
//     .skip(pagination.start - 1)
//     .limit(limit);

//   res.status(200).json({
//     success: true,
//     data: users,
//     pagination,
//   });
// });

// exports.getUser = asyncHandler(async (req, res, next) => {
//   const user = await User.findById(req.params.id).populate("cart");

//   if (!user) {
//     //aldaa tsatsaj bna
//     throw new MyError(req.params.id + " ID-тэй хэрэглэгч олдсонгүй", 400);
//   }
//   res.status(200).json({
//     success: true,
//     data: user,
//   });
// });

// exports.updateUser = asyncHandler(async (req, res, next) => {
//   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!user) {
//     throw new MyError(req.params.id + " ID-тэй хэрэглэгч байхгүй", 400);
//   }

//   res.status(200).json({
//     success: true,
//     data: user,
//   });
// });

// exports.deleteUser = asyncHandler(async (req, res, next) => {
//   console.log("removing .....");
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     throw new MyError(req.params.id + " ID-тэй хэрэглэгч байхгүй", 400);
//   }

//   user.remove();

//   res.status(200).json({
//     success: true,
//     data: user,
//   });
// });

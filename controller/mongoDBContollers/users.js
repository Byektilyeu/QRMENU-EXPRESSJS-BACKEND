const User = require("../../models/mongoose/Users");
const MyError = require("../../utils/myError");
const asyncHandler = require("express-async-handler");

// register
exports.register = asyncHandler(async (req, res, next) => {
  const user1 = await User.find({ username: req.body.username });
  console.log("user1 >>>>>>> ", user1);
  if (user1.length != 0) {
    res.status(200).json({
      success: false,
      user: "burtgeltei hereglegch bna!!!",
    });
  } else {
    const user = await User.create(req.body);

    const token = user.getJsonWebToken();

    res.status(200).json({
      success: true,
      token,
      user: user,
    });
  }
});

//login
exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  //Oroltiig shalgana
  if (!username || !password) {
    throw MyError("Нэвтрэх нэр болон нууц үгээ дамжуулна уу", 400);
  }

  //Тухайн хэргэлэгчийг хайна
  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    throw new MyError("Нэвтрэх нэр болон нууц үгээ зөв оруулна уу", 401);
  }

  const ok = await user.checkPassword(password);

  if (!ok) {
    throw new MyError("Нэвтрэх нэр болон нууц үгээ зөв оруулна уу", 401);
  }

  const token = user.getJsonWebToken();

  const cookieOption = {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    // zuvhun http protocoloor l damjigdana gesen tohirgoo. Jishee ni front taldaa clg hiigeed document.cookie-iig consoled gargah bolomjgui bolgoj bna gesen ug
    httpOnly: true,
  };

  res.status(200).cookie("qrmenu-token", token, cookieOption).json({
    success: true,
    token,
    user: user,
  });
});

// logout
exports.logout = asyncHandler(async (req, res, next) => {
  const cookieOption = {
    expires: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
    // zuvhun http protocoloor l damjigdana gesen tohirgoo. Jishee ni front taldaa clg hiigeed document.cookie-iig consoled gargah bolomjgui bolgoj bna gesen ug
    httpOnly: true,
  };

  res.status(200).cookie("qrmenu-token", null, cookieOption).json({
    success: true,
    data: "logged out ...",
  });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  console.log("data: ", req.body);
  const user = await User.create(req.body);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  console.log("removing .....");
  const username = req.body.username;
  const objID = req.body.objID;
  const user = await User.findOne({ username, objID });

  if (!user) {
    throw new MyError(
      username + " username-тэй эсвэл object ID-тэй хэрэглэгч байхгүй",
      400
    );
  }

  user.remove();

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  // const user = await User.findOneAndUpdate(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true,
  // });

  const user = await User.findOneAndUpdate(
    { username: req.body.username },
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        objID: req.body.objID,
      },
    },
    { new: true, runValidators: true },
    (err, doc) => {
      if (err) {
        console.log("error update user", err);
      }
    }
  );

  if (!user) {
    throw new MyError(
      req.body.username + " username-тэй хэрэглэгч байхгүй",
      400
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll();

  res.status(200).json({
    success: true,
    data: users,
  });
});

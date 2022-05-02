const errorHandler = (err, req, res, next) => {
  console.log(err.stack.cyan.underline);

  const error = { ...err };

  error.message = err.message;

  //   console.log(err);

  // if (error.name === "CastError") {
  //   error.message = "Энэ ID буруу бүтэцтэй байна";
  //   error.statusCode = 400;
  // }

  console.log(err.message);

  if (
    error.message.startsWith(
      "User validation failed: password: Path `password` "
    )
  ) {
    error.message = "Нууц үг доор хаяж 4 тэмдэгтээс тогтох ёстой!";
    error.statusCode = 401;
  }

  if (error.code === 11000) {
    error.message = "Энэ талбарын утгыг давхардуулж өгч болохгүй";
    error.statusCode = 400;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error,
  });
};

module.exports = errorHandler;

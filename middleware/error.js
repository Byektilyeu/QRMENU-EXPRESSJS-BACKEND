const errorHandler = (err, req, res, next) => {
  console.log(err);

  const error = { ...err };

  error.message = err.message;

  console.log(err.message);

  if (
    error.message.startsWith(
      "User validation failed: password: Path `password` "
    )
  ) {
    error.message = "Нууц үг доор хаяж 4 тэмдэгтээс тогтох ёстой!";
    error.statusCode = 401;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error,
  });
};

module.exports = errorHandler;

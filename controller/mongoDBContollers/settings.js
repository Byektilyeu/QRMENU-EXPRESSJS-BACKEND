const asyncHandler = require("express-async-handler");
const Settings = require("../../models/mongoose/Settings.js");

// create restaurant settings
exports.createSettings = asyncHandler(async (req, res, next) => {
  // const settings = await Settings.create(req.body);
  Settings.findOne({ objID: req.body.objID })
    .then((doc) => {
      if (doc === null) {
        Settings.insertMany(req.body);
      } else {
        Settings.findOneAndUpdate(
          { objID: req.body.objID },
          {
            $set: {
              IP: req.body.IP,
              port: req.body.port,
              username: req.body.username,
              password: req.body.password,
              stationID: req.body.stationID,
              paymentID: req.body.paymentID,
              waiterID: req.body.waiterID,
              stationCode: req.body.stationCode,
              objID: req.body.objID,
            },
          },
          { new: true, runValidators: true },
          (err, doc) => {
            if (err) {
              console.log("error", err);
            }
            // console.log("updated", doc);
          }
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });

  res.status(200).json({
    success: true,
  });
});

// get restaurant settings -> mongoDB
exports.getSettings = asyncHandler(async (req, res, next) => {
  const result = await Settings.find({ objID: req.body.objID });

  res.status(200).json({
    success: true,
    data: result,
  });
});

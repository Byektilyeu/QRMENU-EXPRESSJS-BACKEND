const asyncHandler = require("express-async-handler");
const { Worker } = require("worker_threads");

// ********************get modiScheme details r-keeper*********************

exports.getModiSchemeDetails = asyncHandler(async (req, res, next) => {
  // console.log("ModiScheme details request body => : ", req.body);
  let worker = new Worker("./worker/workerModiSchemeDetails.js", {
    workerData: {
      value: req.body,
      path: "./worker/workerModiSchemeDetails.js",
    },
  });
  worker.on("message", (data) => {
    console.log(data);
  });
});

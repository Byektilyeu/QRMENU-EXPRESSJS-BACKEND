const asyncHandler = require("express-async-handler");
const { Worker } = require("worker_threads");

// ********************get modiSchemes r-keeper*********************

exports.getModiSchemes = asyncHandler(async (req, res, next) => {
  // console.log("ModiSchemes request body => : ", req.body);
  let worker = new Worker("./worker/workerModiSchemes.js", {
    workerData: {
      value: req.body,
      path: "./worker/workerModiSchemes.js",
    },
  });
  worker.on("message", (data) => {
    console.log(data);
  });
});

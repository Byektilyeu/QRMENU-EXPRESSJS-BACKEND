const asyncHandler = require("express-async-handler");
const { Worker } = require("worker_threads");

// ********************get modifiers r-keeper*********************

exports.getModifiers = asyncHandler(async (req, res, next) => {
  // console.log("Modifiers request body => : ", req.body);
  let worker = new Worker("./worker/workerModifiers.js", {
    workerData: {
      value: req.body,
      path: "./worker/workerModifiers.js",
    },
  });
  worker.on("message", (data) => {
    console.log(data);
  });
});

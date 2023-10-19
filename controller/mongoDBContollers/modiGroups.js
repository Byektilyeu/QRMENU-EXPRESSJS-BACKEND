const asyncHandler = require("express-async-handler");
const { Worker } = require("worker_threads");

// ********************get modiGroups r-keeper*********************

exports.getModiGroups = asyncHandler(async (req, res, next) => {
  // console.log("ModiGroups request body => : ", req.body);
  let worker = new Worker("./worker/workerModiGroups.js", {
    workerData: {
      value: req.body,
      path: "./worker/workerModiGroups.js",
    },
  });
  worker.on("message", (data) => {
    console.log(data);
  });
});

// const asyncHandler = require("express-async-handler");
// const HallPlans = require("../../models/mongoose/HallPlans");
// const { Worker } = require("worker_threads");

// exports.getSystemInfo2 = asyncHandler(async (req, res, next) => {
//   let worker = new Worker("./worker/workerGetSystemInfo2.js", {
//     // workerData: {
//     //   value: req.body,
//     //   path: "./worker/workerGetSystemInfo2.js",
//     // },
//   });
//   worker.on("message", (data) => {
//     console.log(data);
//   });
// });

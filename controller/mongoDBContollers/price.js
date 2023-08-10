const asyncHandler = require("express-async-handler");
var convert = require("xml-js");
var https = require("follow-redirects").https;
const Price = require("../../models/mongoose/Price");

// ********************************************get hall plans -> r-keeper *****************************************************
exports.getPrice = asyncHandler(async (req, res, next) => {
  // var result = "";
  let worker = new Worker("./worker/workerPrice.js", {
    workerData: {
      value: req.body,
      path: "./worker/workerPrice.js",
    },
  });
  worker.on("message", (data) => {
    console.log(data);
  });

  // // token
  // const token = Buffer.from(`${username}:${password}`, "utf8").toString(
  //   "base64"
  // );

  // // https agent
  // const agent = new https.Agent({
  //   rejectUnauthorized: false,
  // });

  // // request options
  // var options = {
  //   method: "POST",
  //   hostname: IP,
  //   port: PORT,
  //   agent,
  //   path: "/rk7api/v0/xmlinterface.xml",
  //   headers: {
  //     Authorization: `Basic ${token}`,
  //     "Content-Type": "application/xml",
  //   },
  //   maxRedirects: 0,
  // };

  // //  requestGetPrice request / -> r-keeper /
  // var requestGetPrice = https.request(options, function (response) {
  //   var chunks = [];

  //   response.on("data", function (chunk) {
  //     chunks.push(chunk);
  //   });

  //   response.on("end", function (chunk) {
  //     var body = Buffer.concat(chunks);

  //     const requestBody = body.toString();
  //     result = convert.xml2json(requestBody, {
  //       compact: true,
  //       spaces: 2,
  //       ignoreDeclaration: true,
  //       attributesKey: false,
  //     });

  //     var resultJson = JSON.parse(result);
  //     var results = [];
  //     results = resultJson.RK7QueryResult.Dishes.Item;
  //     results.map(function (data) {
  //       var identOrderMenu = data._attributes.Ident;
  //       var priceOrderMenu = data._attributes.Price;

  //       Price.findOne({ identOrderMenu: identOrderMenu })
  //         .then((doc) => {
  //           if (doc === null) {
  //             Price.insertMany({
  //               objID: objID,
  //               identOrderMenu: identOrderMenu,
  //               priceOrderMenu: priceOrderMenu,
  //             });
  //           } else {
  //             Price.findOneAndUpdate(
  //               { identOrderMenu: identOrderMenu },
  //               {
  //                 $set: {
  //                   identOrderMenu: identOrderMenu,
  //                   priceOrderMenu: priceOrderMenu,
  //                 },
  //               },
  //               { new: true, runValidators: true },
  //               (err, doc) => {
  //                 if (err) {
  //                   console.log("error", err);
  //                 }
  //                 // console.log("updated", doc);
  //               }
  //             );
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     });

  //     res.status(200).json({
  //       success: true,
  //       data: results,
  //     });
  //   });

  //   response.on("error", function (error) {
  //     console.error(error);
  //   });
  // });

  // var postData =
  //   '<?xml version="1.0" encoding="utf-8"?>\r\n<RK7Query>\r\n<RK7CMD CMD="GetOrderMenu" >\r\n<Station code="1"/>\r\n</RK7CMD>\r\n</RK7Query>';

  // requestGetPrice.write(postData);
  // requestGetPrice.end();
});

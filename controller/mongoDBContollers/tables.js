const asyncHandler = require("express-async-handler");
const Table = require("../../models/mongoose/Table");
const { Worker } = require("worker_threads");
// var https = require("follow-redirects").https;
// var convert = require("xml-js");

// get table list ->  mongodb
exports.getTablesMongodb = asyncHandler(async (req, res, next) => {
  const objectID = req.body.objID;
  const hallPlansIdent = req.body.hallPlansIdent;

  const tablesDB = await Table.find({
    objID: objectID,
    tableMainParentIdent: hallPlansIdent,
  });
  // console.log("tablesDB", tablesDB);

  res.status(200).json({
    success: true,
    data: tablesDB,
  });
});

//============================
exports.getTables = asyncHandler(async (req, res, next) => {
  let worker = new Worker("./worker/workerTables.js", {
    workerData: {
      value: req.body,
      path: "./worker/workerMenuItems.js",
    },
  });
  worker.on("message", (data) => {
    console.log(data);
  });

  // var resultTable = "";
  // // req body data
  // const IP = req.body.IP;
  // const PORT = req.body.PORT;
  // const username = req.body.username;
  // const password = req.body.password;
  // const objID = req.body.objID;
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
  // // get table request / -> r-keeper /
  // var requestGetTable = https.request(options, function (responseTable) {
  //   var chunksTable = [];
  //   responseTable.on("data", function (chunkTable) {
  //     chunksTable.push(chunkTable);
  //   });
  //   responseTable.on("end", function (chunkTable) {
  //     var bodyTable = Buffer.concat(chunksTable);
  //     const requestBodyTable = bodyTable.toString();
  //     resultTable = convert.xml2json(requestBodyTable, {
  //       compact: true,
  //       spaces: 2,
  //       ignoreDeclaration: true,
  //       attributesKey: false,
  //     });
  //     var resultJsonTable = JSON.parse(resultTable);
  //     // console.log("resultJsonTable: ======> ", resultJsonTable);
  //     var resultsTable = [];
  //     resultsTable =
  //       resultJsonTable.RK7QueryResult.CommandResult.RK7Reference.Items.Item;
  //     resultsTable.map(function (dataTable) {
  //       console.log("table idents: " + dataTable._attributes.Ident);
  //       //insert or update table data -> mongoDB
  //       Table.findOne({ tableIdent: dataTable._attributes.Ident })
  //         .then((doc) => {
  //           if (doc === null) {
  //             Table.insertMany({
  //               objID: objID,
  //               tableIdent: dataTable._attributes.Ident,
  //               tableMainParentIdent: dataTable._attributes.MainParentIdent,
  //               tableCode: dataTable._attributes.Code,
  //               tableName: dataTable._attributes.Name,
  //             });
  //           } else {
  //             Table.findOneAndUpdate(
  //               { tableIdent: dataTable._attributes.Ident },
  //               {
  //                 $set: {
  //                   tableIdent: dataTable._attributes.Ident,
  //                   tableMainParentIdent: dataTable._attributes.MainParentIdent,
  //                   tableCode: dataTable._attributes.Code,
  //                   tableName: dataTable._attributes.Name,
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
  //     // // console.log("=getSystem info PAID: ", result3);
  //     res.status(200).json({
  //       success: true,
  //       data: resultsTable,
  //     });
  //   });
  //   responseTable.on("error", function (error) {
  //     console.error(error);
  //   });
  // });
  // // get table requestBody
  // var requestBodyTable =
  //   '<?xml version="1.0" encoding="utf-8"?>\r\n<RK7Query>\r\n    <RK7Command CMD="GetRefData" RefName = "TABLES"> </RK7Command>\r\n</RK7Query>';
  // requestGetTable.write(requestBodyTable);
  // requestGetTable.end();
});

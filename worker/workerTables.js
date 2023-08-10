const { parentPort, workerData } = require("worker_threads");
var convert = require("xml-js");
const Table = require("../models/mongoose/Table");
var https = require("follow-redirects").https;
const mongoose = require("mongoose");

var result = "";
var resultJson = "";
// // req body data
const IP = workerData.value.IP;
const PORT = workerData.value.PORT;
const username = workerData.value.username;
const password = workerData.value.password;
const objID = workerData.value.objID;

const MongoConnect = async () => {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(
      "mongodb+srv://qrMenuOrders:qrMenuOrders2023@qrmenuorders.pkn07fr.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("MongoDB Connected hallplans..."))
    .catch((err) => console.log(err));
};
MongoConnect();

// const IP = "10.0.0.104";
// const PORT = 8086;
// const username = "http_user1";
// const password = 9;
// const objID = 992500001;
// var resultTable = "";

// token
const token = Buffer.from(`${username}:${password}`, "utf8").toString("base64");
// https agent
const agent = new https.Agent({
  rejectUnauthorized: false,
});
// request options
var options = {
  method: "POST",
  hostname: IP,
  port: PORT,
  agent,
  path: "/rk7api/v0/xmlinterface.xml",
  headers: {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/xml",
  },
  maxRedirects: 0,
};
// get table request / -> r-keeper /
var requestGetTable = https.request(options, function (responseTable) {
  var chunksTable = [];
  responseTable.on("data", function (chunkTable) {
    chunksTable.push(chunkTable);
  });
  responseTable.on("end", function (chunkTable) {
    var bodyTable = Buffer.concat(chunksTable);
    const requestBodyTable = bodyTable.toString();
    resultTable = convert.xml2json(requestBodyTable, {
      compact: true,
      spaces: 2,
      ignoreDeclaration: true,
      attributesKey: false,
    });
    var resultJsonTable = JSON.parse(resultTable);
    // console.log("resultJsonTable: ======> ", resultJsonTable);
    var resultsTable = [];
    resultsTable =
      resultJsonTable.RK7QueryResult.CommandResult.RK7Reference.Items.Item;
    resultsTable.map(function (dataTable) {
      console.log("table idents: " + dataTable._attributes.Ident);
      //insert or update table data -> mongoDB
      Table.findOne({ tableIdent: dataTable._attributes.Ident })
        .then((doc) => {
          if (doc === null) {
            Table.insertMany({
              objID: objID,
              tableIdent: dataTable._attributes.Ident,
              tableMainParentIdent: dataTable._attributes.MainParentIdent,
              tableCode: dataTable._attributes.Code,
              tableName: dataTable._attributes.Name,
            });
          } else {
            Table.findOneAndUpdate(
              { tableIdent: dataTable._attributes.Ident },
              {
                $set: {
                  tableIdent: dataTable._attributes.Ident,
                  tableMainParentIdent: dataTable._attributes.MainParentIdent,
                  tableCode: dataTable._attributes.Code,
                  tableName: dataTable._attributes.Name,
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
    });
  });
  responseTable.on("error", function (error) {
    console.error(error);
  });
});
// get table requestBody
var requestBodyTable =
  '<?xml version="1.0" encoding="utf-8"?>\r\n<RK7Query>\r\n    <RK7Command CMD="GetRefData" RefName = "TABLES"> </RK7Command>\r\n</RK7Query>';
requestGetTable.write(requestBodyTable);
requestGetTable.end();

parentPort.postMessage(resultJson);

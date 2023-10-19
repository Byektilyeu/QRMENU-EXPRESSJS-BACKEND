const { parentPort, workerData } = require("worker_threads");
var convert = require("xml-js");
const HallPlans = require("../models/mongoose/HallPlans");
var https = require("follow-redirects").https;
const mongoose = require("mongoose");

var result = "";
var resultJson = "";
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

// get hallplans request / -> r-keeper /
var requestGetHallPlans = https.request(options, function (response) {
  var chunks = [];

  response.on("data", function (chunk) {
    chunks.push(chunk);
  });

  response.on("end", function (chunk) {
    var body = Buffer.concat(chunks);

    const requestBody = body.toString();
    result = convert.xml2json(requestBody, {
      compact: true,
      spaces: 2,
      ignoreDeclaration: true,
      attributesKey: false,
    });

    var resultJson = JSON.parse(result);
    var results = [];
    results = resultJson.RK7QueryResult.CommandResult.RK7Reference.Items.Item;
    results.map(function (data) {
      // console.log("hall plan idents: " + data._attributes.Ident);

      // insert or update hallplane data  -> mongoDB
      HallPlans.findOne({ hallplansIdent: data._attributes.Ident })
        .then((doc) => {
          if (doc === null) {
            HallPlans.insertMany({
              objID: objID,
              HallPlansMainParentIdent: data._attributes.Ident,
              hallplansIdent: data._attributes.Ident,
            });
          } else {
            HallPlans.findOneAndUpdate(
              { hallplansIdent: data._attributes.Ident },
              {
                $set: {
                  HallPlansMainParentIdent: data._attributes.Ident,
                  hallplansIdent: data._attributes.Ident,
                },
              },
              { new: true, runValidators: true },
              (err, doc) => {
                if (err) {
                  console.log("error", err);
                }
              }
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });

  response.on("error", function (error) {
    console.error(error);
  });
});

// get hallplans requestBody
var postData =
  '<?xml version="1.0" encoding="utf-8"?>\r\n<RK7Query>\r\n    <RK7Command CMD="GetRefData" RefName = "HALLPLANS"> </RK7Command>\r\n</RK7Query>';

requestGetHallPlans.write(postData);
requestGetHallPlans.end();

parentPort.postMessage(resultJson);

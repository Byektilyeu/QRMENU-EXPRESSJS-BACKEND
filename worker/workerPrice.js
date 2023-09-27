const { parentPort, workerData } = require("worker_threads");
var convert = require("xml-js");
const Price = require("../models/mongoose/Price");
var https = require("follow-redirects").https;
const mongoose = require("mongoose");

var result = "";
var resultJson = "";
console.log("workerData.value.objID", workerData.value.IP);
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

//  requestGetPrice request / -> r-keeper /
var requestGetPrice = https.request(options, function (response) {
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
    results = resultJson.RK7QueryResult.Dishes.Item;
    results.map(function (data) {
      var identOrderMenu = data._attributes.Ident;
      var priceOrderMenu = data._attributes.Price;

      Price.findOne({ identOrderMenu: identOrderMenu })
        .then((doc) => {
          if (doc === null) {
            Price.insertMany({
              objID: objID,
              identOrderMenu: identOrderMenu,
              priceOrderMenu: priceOrderMenu,
            });
          } else {
            Price.findOneAndUpdate(
              { identOrderMenu: identOrderMenu },
              {
                $set: {
                  identOrderMenu: identOrderMenu,
                  priceOrderMenu: priceOrderMenu,
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

  response.on("error", function (error) {
    console.error(error);
  });
});

var postData =
  '<?xml version="1.0" encoding="utf-8"?>\r\n<RK7Query>\r\n<RK7CMD CMD="GetOrderMenu" >\r\n<Station code="1"/>\r\n</RK7CMD>\r\n</RK7Query>';

requestGetPrice.write(postData);
requestGetPrice.end();
parentPort.postMessage(resultJson);

const { parentPort, workerData } = require("worker_threads");
var convert = require("xml-js");
// const Table = require("../models/mongoose/Table");
const Settings = require("../models/mongoose/Settings");
const Shifts = require("../models/mongoose/Shifts");
var https = require("follow-redirects").https;
const mongoose = require("mongoose");
const moment = require("moment");
const axios = require("axios");

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
    .then(() => console.log("MongoDB Connected getSystemInfo2..."))
    .catch((err) => console.log(err));
};
MongoConnect();

const SettlementPassRequest = async (passToken, objID, startDate, endDate) => {
  let data = JSON.stringify({
    start_datetime: startDate,
    end_datetime: endDate,
    ecommerce_token: passToken,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://ecomstg.pass.mn/openapi/v1/ecom/settlement",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(
        "response pass settlement request",
        JSON.stringify(response.data)
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

function intervalFunc() {
  let settings = "";

  const getSettings = async () => {
    settings = await Settings.find();
    settings.map((data, index) => {
      //   console.log("Settings: " + index + ". " + data);
      //   console.log(data.objID);

      const token = Buffer.from(
        `${data.username}:${data.password}`,
        "utf8"
      ).toString("base64");

      const agent = new https.Agent({
        rejectUnauthorized: false,
      });

      var options = {
        method: "POST",
        hostname: data.IP,
        port: data.port,
        agent,
        path: "/rk7api/v0/xmlinterface.xml",
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/xml",
        },
        maxRedirects: 20,
      };
      var result1 = "";

      var req = https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function (chunk) {
          var body = Buffer.concat(chunks);

          const body1 = body.toString();
          result1 = convert.xml2json(body1, {
            compact: true,
            spaces: 2,
            ignoreDeclaration: true,
            attributesKey: false,
          });
          var resultJson = JSON.parse(result1);
          if (resultJson.RK7QueryResult._attributes.RK7ErrorN == "2172") {
            console.log("Undsen eelj haagdaj bna");
          } else {
            console.log(
              "shift number: ",
              resultJson.RK7QueryResult.SystemInfo.CommonShift._attributes
            );

            Shifts.findOne({
              objID: resultJson.RK7QueryResult.SystemInfo._attributes.RestCode,
            })
              .then((doc) => {
                if (doc == null) {
                  Shifts.insertMany({
                    objID:
                      resultJson.RK7QueryResult.SystemInfo._attributes.RestCode,
                    shiftNum: "",
                    shiftDate: "",
                    shiftStartDate: "",
                    shiftEndDate: "",
                  });
                } else if (
                  resultJson.RK7QueryResult.SystemInfo.CommonShift._attributes
                    .ShiftNum != doc.shiftNum
                ) {
                  console.log(
                    "123",
                    resultJson.RK7QueryResult.SystemInfo.CommonShift._attributes
                      .ShiftNum
                  );
                  console.log("456", doc.shiftNum);
                  // pass token baigaa esehiig shalgah code
                  // pass token baigaa esehiig shalgah code
                  // pass token baigaa esehiig shalgah code
                  // pass token baigaa esehiig shalgah code
                  SettlementPassRequest(
                    data.passToken,
                    resultJson.RK7QueryResult.SystemInfo._attributes.RestCode,
                    resultJson.RK7QueryResult.SystemInfo.CommonShift._attributes
                      .ShiftStartTime,
                    moment().format("YYYY-MM-DDTHH:mm:ss")
                  );
                  Shifts.findOneAndUpdate(
                    {
                      objID:
                        resultJson.RK7QueryResult.SystemInfo._attributes
                          .RestCode,
                    },
                    {
                      $set: {
                        shiftNum:
                          resultJson.RK7QueryResult.SystemInfo.CommonShift
                            ._attributes.ShiftNum,
                        shiftDate:
                          resultJson.RK7QueryResult.SystemInfo.CommonShift
                            ._attributes.ShiftDate,
                        shiftStartDate:
                          resultJson.RK7QueryResult.SystemInfo.CommonShift
                            ._attributes.ShiftStartTime,
                        shiftEndDate: moment().format("YYYY-MM-DDTHH:mm:ss"),
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
          }

          //   console.log("=getSystem info PAID: ", result1);
        });

        res.on("error", function (error) {
          console.error("eroror ____________________ ", error);
        });
      });

      var postData =
        '<?xml version="1.0" encoding="utf-8"?>\r\n<RK7Query>\r\n    <RK7CMD CMD="GetSystemInfo2"/>\r\n</RK7Query>';

      req.write(postData);
      req.on("error", function (e) {
        console.error("errrrrrr______________________ ", e);
      });
      req.end();
    });
  };
  getSettings();
  console.log("2");
}
setInterval(intervalFunc, 20000);

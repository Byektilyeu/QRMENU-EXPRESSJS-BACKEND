const asyncHandler = require("express-async-handler");
var convert = require("xml-js");
var https = require("follow-redirects").https;
const HallPlans = require("../../models/mongoose/HallPlans");

// ********************************************get hall plans rkeeper*****************************************************
exports.getHallPlans = asyncHandler(async (req, res, next) => {
  var result = "";

  // req body data
  const IP = req.body.IP;
  const PORT = req.body.PORT;
  const username = req.body.username;
  const password = req.body.password;
  const objID = req.body.objID;

  // token
  const token = Buffer.from(`${username}:${password}`, "utf8").toString(
    "base64"
  );

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
        console.log("hall plan idents: " + data._attributes.Ident);

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

      // console.log("=getSystem info PAID: ", result3);
      res.status(200).json({
        success: true,
        data: results,
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
});

// get hall plans mongodb
exports.getHallPlansMongodb = asyncHandler(async (req, res, next) => {
  const objectID = req.body.objID;

  const hallplansDB = await HallPlans.find({ objID: objectID });
  // console.log(hallplansDB);

  res.status(200).json({
    success: true,
    data: hallplansDB,
  });
});

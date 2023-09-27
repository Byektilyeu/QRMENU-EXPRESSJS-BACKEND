const asyncHandler = require("express-async-handler");
const { hostname } = require("os");
var convert = require("xml-js");
var https = require("follow-redirects").https;
const Settings = require("../../models/mongoose/Settings");

// ********************************************get system info*****************************************************
exports.getSystemInfo = asyncHandler(async (req, res, next) => {
  const username = "http_user1";
  const password = 9;

  const token = Buffer.from(`${username}:${password}`, "utf8").toString(
    "base64"
  );

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  var options = {
    method: "POST",
    hostname: "10.0.0.103",
    port: 8086,
    agent,
    path: "/rk7api/v0/xmlinterface.xml",
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/xml",
    },
    maxRedirects: 20,
  };
  var result1 = "";

  var req1 = https.request(options, function (res1) {
    var chunks = [];

    res1.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res1.on("end", function (chunk) {
      var body = Buffer.concat(chunks);

      const body1 = body.toString();
      result1 = convert.xml2json(body1, {
        compact: true,
        spaces: 2,
        ignoreDeclaration: true,
        attributesKey: false,
      });
      console.log("=getSystem info PAID: ", result1);
      res.status(200).json({
        success: true,
        data: result1,
      });
    });

    res1.on("error", function (error) {
      console.error(error);
    });
  });

  var postData =
    '<?xml version="1.0" encoding="utf-8"?>\r\n<RK7Query>\r\n    <RK7CMD CMD="GetSystemInfo"/>\r\n</RK7Query>';

  req1.write(postData);
  req1.end();
});

// ******************************************** Save Order *****************************************************
exports.saveOrder = asyncHandler(async (req, res, next) => {
  const orders = req.body.orders;
  const guid = req.body.guid;
  const username = req.body.username;
  const password = req.body.password;
  const hostname = req.body.hostname;
  const port = req.body.port;

  const jsonObj = {
    RK7Query: {
      RK7CMD: {
        _attributes: { CMD: "SaveOrder" },
        Order: {
          _attributes: {
            guid: guid,
          },
        },
        Session: {
          Dish: orders.map((order) => {
            return {
              _attributes: {
                id: order.id,
                quantity: order.quantity * 1000,
              },
            };
          }),
        },
      },
    },
  };

  const json1 = JSON.stringify(jsonObj);

  const xml = convert.json2xml(json1, {
    attributes_key: "_attributes",
    compact: true,
    spaces: 4,
  });
  console.log("xml ===> ", xml);

  const token = Buffer.from(`${username}:${password}`, "utf8").toString(
    "base64"
  );

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  var options = {
    method: "POST",
    hostname: hostname,
    port: port,
    agent,
    path: "/rk7api/v0/xmlinterface.xml",
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/xml",
    },
    maxRedirects: 20,
  };
  var result1 = "";

  var req1 = https.request(options, function (res1) {
    var chunks = [];

    res1.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res1.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      const body1 = body.toString();
      console.log("save order result ==> ", body1);
      result1 = convert.xml2json(body1, {
        compact: true,
        spaces: 2,
        ignoreDeclaration: true,
        attributesKey: false,
      });

      res.status(200).json({
        success: true,
        data: result1,
      });
    });

    res1.on("error", function (error) {
      console.error(error);
    });
  });

  req1.write(xml);
  req1.end();
});

// ******************************************** Create Order *****************************************************
exports.createOrder = asyncHandler(async (req, res, next) => {
  const tableID = req.body.tableID;
  const stationID = req.body.stationID;
  const waiterID = req.body.waiterID;
  const orderType = req.body.orderType;
  const username = req.body.username;
  const password = req.body.password;
  const hostname = req.body.hostname;
  const port = req.body.port;
  console.log("req body ===> ", req.body);

  const jsonObj = {
    RK7Query: {
      RK7CMD: {
        _attributes: { CMD: "CreateOrder" },
        Order: {
          Table: {
            _attributes: {
              id: tableID,
            },
          },
          Station: {
            _attributes: {
              id: stationID,
            },
          },
          Waiter: {
            _attributes: {
              id: waiterID,
            },
          },
          OrderType: {
            _attributes: {
              code: orderType,
            },
          },
        },
      },
    },
  };

  const json = JSON.stringify(jsonObj);

  const xml = convert.json2xml(json, {
    attributes_key: "_attributes",
    compact: true,
    spaces: 4,
  });
  console.log("xml ===> ", xml);

  const token = Buffer.from(`${username}:${password}`, "utf8").toString(
    "base64"
  );

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  var options = {
    method: "POST",
    hostname: hostname,
    port: port,
    agent,
    path: "/rk7api/v0/xmlinterface.xml",
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/xml",
    },
    maxRedirects: 20,
  };
  var result1 = "";

  var req1 = https.request(options, function (res1) {
    var chunks = [];

    res1.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res1.on("end", function (chunk) {
      var body = Buffer.concat(chunks);

      const body1 = body.toString();
      result1 = convert.xml2json(body1, {
        compact: true,
        spaces: 2,
        ignoreDeclaration: true,
        attributesKey: false,
      });
      // console.log("=========", result1);
      res.status(200).json({
        success: true,
        data: result1,
      });
    });

    res1.on("error", function (error) {
      console.error(error);
    });
  });

  // var postData =
  //   '<?xml version="1.0" encoding="UTF-8"?>\r\n<RK7Query>\r\n\t<RK7CMD CMD="CreateOrder">\r\n\t\t<Order>\r\n\t\t\t<Table id="1000478"/>\r\n\t\t\t<Station id="15002"/>\r\n\t\t\t<Waiter id="1000007"/>\r\n\t\t\t<OrderType code="2"/>\r\n\t\t</Order>\r\n\t</RK7CMD>\r\n</RK7Query>';

  req1.write(xml);
  req1.end();
});

// ******************************************** Pay Order *****************************************************
exports.payOrder = asyncHandler(async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const guid = req.body.guid;
  console.log(req.body);
  const stationCode = req.body.stationCode;
  const paymentID = req.body.paymentID;
  const amount = req.body.amount;
  const cashierCode = req.body.cashierCode;
  const hostname = req.body.hostname;
  const port = req.body.port;

  const token = Buffer.from(`${username}:${password}`, "utf8").toString(
    "base64"
  );

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const jsonObj = {
    RK7Query: {
      RK7CMD: {
        _attributes: { CMD: "PayOrder" },
        Order: {
          _attributes: {
            guid: guid,
          },
        },
        Cashier: {
          _attributes: {
            id: cashierCode,
          },
        },
        Station: {
          _attributes: {
            code: stationCode,
          },
        },
        Payment: {
          _attributes: {
            id: paymentID,
            amount: amount,
          },
        },
      },
    },
  };
  const json = JSON.stringify(jsonObj);

  const xml = convert.json2xml(json, {
    attributes_key: "_attributes",
    compact: true,
    spaces: 4,
  });
  console.log("xml ===> ", xml);

  var options = {
    method: "POST",
    hostname: hostname,
    port: port,
    agent,
    path: "/rk7api/v0/xmlinterface.xml",
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/xml",
    },
    maxRedirects: 100,
  };
  var result1 = "";

  var req1 = https.request(options, function (res1) {
    var chunks = [];

    res1.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res1.on("end", function (chunk) {
      var body = Buffer.concat(chunks);

      const body1 = body.toString();
      console.log("body1", body1);
      result1 = convert.xml2json(body1, {
        compact: true,
        spaces: 2,
        ignoreDeclaration: true,
        attributesKey: false,
      });
      console.log("========= result 1", result1);
      res.status(200).json({
        success: true,
        data: result1,
      });
    });

    res1.on("error", function (error) {
      console.error(error);
    });
  });

  // var postData =
  //   '<?xml version="1.0" encoding="UTF-8"?>\r\n<RK7Query>\r\n\t<RK7CMD CMD="PayOrder" calcBySeats="0" seat="0">\r\n\t\t<Order visit="536962263" orderIdent="256"/>\r\n\t\t<Station id="15013"/>\r\n\t\t<Cashier id="1000007"/>\r\n\t\t<Payment id="3" amount="700000"/>\r\n\t</RK7CMD>\r\n</RK7Query>';

  req1.write(xml);
  req1.end();
});

// *********************************************************** DeleteReceipt **************************************************************

exports.deleteReceipt = asyncHandler(async (req, res, next) => {
  const settings = await Settings.find({ objID: req.body.objID });
  const username = settings[0].username;
  const password = settings[0].password;
  const hostname = settings[0].IP;
  const port = settings[0].port;
  const receiptNum = req.body.receiptNum;
  const managerPassword = settings[0].managerPassword;
  const managerID = settings[0].managerID;
  const deleteReasonID = settings[0].deleteReasonID;
  console.log("delete receipt request body ===> ", req.body);

  const token = Buffer.from(`${username}:${password}`, "utf8").toString(
    "base64"
  );

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const jsonObj = {
    RK7Query: {
      RK7CMD: {
        _attributes: {
          CMD: "DeleteReceipt",
          ReceiptNum: receiptNum,
          ManagerPassword: managerPassword,
        },
        Manager: {
          _attributes: {
            id: managerID,
          },
        },
        DeleteReason: {
          _attributes: {
            id: deleteReasonID,
          },
        },
      },
    },
  };
  const json = JSON.stringify(jsonObj);

  const xml = convert.json2xml(json, {
    attributes_key: "_attributes",
    compact: true,
    spaces: 4,
  });
  console.log("xml ===> ", xml);

  var options = {
    method: "POST",
    hostname: hostname,
    port: port,
    agent,
    path: "/rk7api/v0/xmlinterface.xml",
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/xml",
    },
    maxRedirects: 100,
  };
  var result1 = "";

  var req1 = https.request(options, function (res1) {
    var chunks = [];

    res1.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res1.on("end", function (chunk) {
      var body = Buffer.concat(chunks);

      const body1 = body.toString();
      // console.log("body1", body1);
      result1 = convert.xml2json(body1, {
        compact: true,
        spaces: 2,
        ignoreDeclaration: true,
        attributesKey: false,
      });
      console.log(
        "========= result void order R-keepeer v_____________________________________",
        result1
      );
      res.status(200).json({
        success: true,
        data: result1,
        managerID: managerID,
      });
    });

    res1.on("error", function (error) {
      console.error(error);
    });
  });

  req1.write(xml);
  req1.end();
});

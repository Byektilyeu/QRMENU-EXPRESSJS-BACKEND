const asyncHandler = require("express-async-handler");
var convert = require("xml-js");
var https = require("follow-redirects").https;

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
    hostname: "10.0.0.111",
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
    hostname: "10.0.0.111",
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
  console.log("req body ===> ", req.body);
  const username = "http_user1";
  const password = 9;

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
    hostname: "10.0.0.111",
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
    hostname: "10.0.0.111",
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

  var postData =
    '<?xml version="1.0" encoding="UTF-8"?>\r\n<RK7Query>\r\n\t<RK7CMD CMD="PayOrder" calcBySeats="0" seat="0">\r\n\t\t<Order visit="536962263" orderIdent="256"/>\r\n\t\t<Station id="15013"/>\r\n\t\t<Cashier id="1000007"/>\r\n\t\t<Payment id="3" amount="700000"/>\r\n\t</RK7CMD>\r\n</RK7Query>';

  req1.write(postData);
  req1.end();
});

const asyncHandler = require("express-async-handler");
var convert = require("xml-js");
const Categories = require("../../models/mongoose/Categories");
var https = require("follow-redirects").https;
const MenuItems = require("../../models/mongoose/MenuItems");

// ********************************************get menu items r-keeper*****************************************************
exports.getMenuItems = asyncHandler(async (req, res, next) => {
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

  // get menu items request / -> r-keeper /
  var requestGetMenuItems = https.request(options, function (response) {
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
      results = resultJson.RK7QueryResult.CommandResult;
      results.map(function (rkdata, index) {
        var className = rkdata.RK7Reference._attributes.ClassName;
        switch (className) {
          // Category list-ийг r-keeper-ийн response-оос авах
          case "TCategListItems":
            var TCategListItems = rkdata.RK7Reference.Items.Item;
            TCategListItems.map(function (item) {
              var categoryName = item._attributes.Name;
              var categoryIdent = item._attributes.Ident;
              var categoryComment = item._attributes.Comment;
              var categoryGenname0450 = "";
              var categoryGenname0409 = "";

              if ("genname0450" in item._attributes) {
                categoryGenname0450 = item._attributes.genname0450;
              } else {
                categoryGenname0450 = "null";
              }

              if ("genname0409" in item._attributes) {
                categoryGenname0409 = item._attributes.genname0409;
              } else {
                categoryGenname0409 = "null";
              }

              Categories.findOne({ Ident: categoryIdent })
                .then((doc) => {
                  if (doc === null) {
                    Categories.insertMany({
                      objID: objID,
                      Name: categoryName,
                      Ident: categoryIdent,
                      Comment: categoryComment,
                      genname0450: categoryGenname0450,
                      genname0409: categoryGenname0409,
                    });
                  } else {
                    Categories.findOneAndUpdate(
                      { Ident: categoryIdent },
                      {
                        $set: {
                          Name: categoryName,
                          Comment: categoryComment,
                          genname0450: categoryGenname0450,
                          genname0409: categoryGenname0409,
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
            break;
          // Menu items-ийг r-keeper-ийн response-оос авах
          case "TRK7MenuItems":
            var TRK7MenuItems = rkdata.RK7Reference.Items.Item;
            TRK7MenuItems.map(function (menuItems) {
              // console.log("menuitem" + menuItems._attributes.Name);
              var name = menuItems._attributes.Name;
              var menuIdent = menuItems._attributes.Ident;
              var code = menuItems._attributes.Code;
              var altName = menuItems._attributes.AltName;
              var modiSchema = menuItems._attributes.ModiSchema;
              var mainParentIdent = menuItems._attributes.MainParentIdent;
              var comment = menuItems._attributes.Comment;
              var genname0450 = "";
              var genname0409 = "";
              var genForWeb = "";
              var genSortForWeb = "";

              if ("genname0450" in menuItems._attributes) {
                genName0450 = menuItems._attributes.genname0450;
              } else {
                genName0450 = "null";
              }

              if ("genname0409" in menuItems._attributes) {
                genname0409 = menuItems._attributes.genname0409;
              } else {
                genname0409 = "null";
              }

              if ("genForWeb" in menuItems._attributes) {
                genForWeb = menuItems._attributes.genForWeb;
              } else {
                genForWeb = "null";
              }

              if ("genSortForWeb" in menuItems._attributes) {
                genSortForWeb = menuItems._attributes.genSortForWeb;
              } else {
                genSortForWeb = "null";
              }

              MenuItems.findOne({ menuIdent: menuIdent })
                .then((doc) => {
                  if (doc === null) {
                    MenuItems.insertMany({
                      objID: objID,
                      name: name,
                      menuIdent: menuIdent,
                      code: code,
                      altName: altName,
                      modiSchema: modiSchema,
                      mainParentIdent: mainParentIdent,
                      comment: comment,
                      genname0450: genname0450,
                      genname0409: genname0409,
                      genForWeb: genForWeb,
                      genSortForWeb: genSortForWeb,
                    });
                  } else {
                    MenuItems.findOneAndUpdate(
                      { menuIdent: menuIdent },
                      {
                        $set: {
                          name: name,
                          code: code,
                          altName: altName,
                          modiSchema: modiSchema,
                          mainParentIdent: mainParentIdent,
                          comment: comment,
                          genname0450: genname0450,
                          genname0409: genname0409,
                          genForWeb: genForWeb,
                          genSortForWeb: genSortForWeb,
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
            break;
          default:
            console.log("default");
        }
      });
      res.status(200).json({
        success: true,
        data: resultJson,
      });
    });

    response.on("error", function (error) {
      console.error(error);
    });
  });

  var postData =
    '<?xml version="1.0" encoding="utf-8"?>\r\n<RK7Query>\r\n    <RK7Command CMD="GetRefData" RefName="CategList" OnlyActive="1" MacroPropTags="true"   WithMacroProp="1" PropMask="Items.(Ident, Name,  Comment, genname0450, genName0409, genForWeb, genSortForWeb, genDescription0409, genDescription0450, genNutValues0409, genNutValues0450, GUIDString)" ></RK7Command>\r\n    <RK7Command CMD="GetRefData" RefName="menuitems" OnlyActive="1" MacroPropTags="true"   WithMacroProp="1" PropMask="Items.(Ident,Code,Name, AltName, ModiScheme,SaleObjectType, mainParentIdent, LargeImagePath, Comment, CategPath, genFiskBar, genname0450, genName0409, genForWeb, genSortForWeb, RecommendedMenuItems, genDescription0409, genDescription0450, genNutValues0409, genNutValues0450, PropCLASSIFICATORGROUPS, GUIDString )" ></RK7Command>\r\n    <RK7Command CMD="GetRefData" RefName="ModiSchemes" IgnoreDefaults="1" IgnoreEnums="0" MacroPropTags="true" OnlyActive="1" WithChildItems="3" PropMask="items.(Ident,Code, Name),items.RIChildItems.TModiSchemeDetail(Ident, ModiScheme,ModiGroup, ReadOnlyName, UpLimit, DownLimit, GUIDString)">\r\n        <PROPFILTERS>\r\n            <PROPFILTER Name="ModiSchemeType" Value="mstCombo"></PROPFILTER>\r\n        </PROPFILTERS>\r\n    </RK7Command>\r\n    <RK7Command CMD="GetRefData" RefName="ModiGroups" OnlyActive="1" IgnoreEnums="false" MacroPropTags="true" WithBlobsData="true" WithChildItems="3" WithMacroProp="true" PropMask="items.(Ident,Name,Code,genName0409, genName0450, genSortForWeb ),items.RIChildItems.TModifier(ItemIdent, Ident, Name, Code, MainParentIdent, Dish, Comment, genName0409, genName0450, genSortForWeb, genDescription0409, genDescription0450, genNutValues0409, genNutValues0450, GUIDString)">\r\n        <PROPFILTERS>\r\n            <PROPFILTER Name="ModiGroupType" Value="mgtCombo"></PROPFILTER>\r\n        </PROPFILTERS>\r\n    </RK7Command>\r\n    <RK7Command CMD="GetRefData" RefName="Prices" ></RK7Command>\r\n</RK7Query>"';

  requestGetMenuItems.write(postData);
  requestGetMenuItems.end();
});

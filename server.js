const express = require("express");
const dotenv = require("dotenv");
var path = require("path");
var rfs = require("rotating-file-stream");
const errorHandler = require("./middleware/error");
var morgan = require("morgan");
// const logger = require("./middleware/logger");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const connectDB = require("./config/db");

// Router oruulj ireh
const hallPlanRoutes = require("./routes/hallPlans");
const tableRoutes = require("./routes/tables");
const menuRoutes = require("./routes/menu");
const categListRoutes = require("./routes/categList");
const menuItemsRoutes = require("./routes/menuItems");
const priceRoutes = require("./routes/price");
const usersRoutes = require("./routes/users");
const getOrderRoutes = require("./routes/rKOrderMenu");
const settingsRoutes = require("./routes/rksettings");
const monpayRoutes = require("./routes/monpay");
const ordersRoutes = require("./routes/orders");
const orderRkeeperRoutes = require("./routes/orderRkeeper");
const settings2Routes = require("./routes/settings2");
const restaurantsRoutes = require("./routes/restaurants");

const injectDb = require("./middleware/injectDb");

var cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");

// App-iin tohirgoog process.env ruu achaalah
dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();
const db = require("./config/db-sqlite");

// create a rotating write stream
var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

// cors tohirgoo
var whitelist = [
  "http://192.168.43.96:3000",
  "http://10.0.0.101:3000",
  "http://10.0.0.108:3000",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      //bolno
      callback(null, true);
    } else {
      //bolohgui
      callback(new Error("Not allowed by CORS"));
    }
  },
  allowedHeaders: "Authorization, Set-Cookie, Content-Type",
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
};

// index.html-ийг public хавтас дотроос ол гэсэн тохиргоо
app.use(express.static(path.join(__dirname, "public")));

// Express rate limit: Дуудалтын тоог хчзгаарлана

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 3000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "15 Минутанд 3 удаа л хандах боломжтой",
  // standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  // legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

// http parametr pollution халдлагын эсрэг books?name=aa&name=bbb ---> name="bbb"
app.use(hpp());
// Body parser
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
// app.use(logger);
app.use(helmet());
app.use(xss());
// to  remove data, use
// app.use(mongoSanitize());
// app.use(fileUpload());
// app ruu middleqare-iig holbohdoo USE gedgiig hereglene
app.use(injectDb(db));
app.use(morgan("combined", { stream: accessLogStream }));
// // use gedgiig ahsiglan turul buriin middleware-uudiig holboj uguh bolomjtoi
app.use("/api/v1/category", categListRoutes);
app.use("/api/v1/categories", categListRoutes);
app.use("/api/v1/users", usersRoutes);

app.use("/api/v1/hallplans", hallPlanRoutes);
app.use("/api/v1/tables", tableRoutes);

app.use("/api/v1/menu", menuRoutes);
// app.use("/api/v1/:Ident/menu", categListRoutes);
app.use("/api/v1/menuitems", menuItemsRoutes);
app.use("/api/v1/price", priceRoutes);

app.use("/api/v1/settings2", settings2Routes);
app.use("/api/v1/rksettings", settingsRoutes);

app.use("/api/v1/getorder", getOrderRoutes);
app.use("/api/v1/monpay", monpayRoutes);
app.use("/api/v1/orders", ordersRoutes);
app.use("/api/v1/rkeeper", orderRkeeperRoutes);
app.use("/api/v1/restaurants", restaurantsRoutes);

// app.use("/api/v1/login", usersRoutes);

app.use(errorHandler);

//sqlite-tei sync hiij bna
db.sequelize
  .sync()
  .then((result) => {
    console.log("sync hiigdlee");
  })
  .catch((err) => console.log(err));

app.listen(
  process.env.PORT,
  console.log(`Express server ${process.env.PORT} deer aslaa...........`)
);

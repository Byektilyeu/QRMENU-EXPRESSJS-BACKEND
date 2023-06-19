const express = require("express");
const dotenv = require("dotenv");
var path = require("path");
var rfs = require("rotating-file-stream");
const errorHandler = require("./middleware/error");
var morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const connectDB = require("./config/db");

// Router oruulj ireh
const hallPlanRoutes = require("./routes/hallPlans");
const tableRoutes = require("./routes/tables");
const menuRoutes = require("./routes/menu");
const categoriesRoutes = require("./routes/categories");
const menuItemsRoutes = require("./routes/menuItems");
const priceRoutes = require("./routes/price");
// const getOrderRoutes = require("./routes/rKOrderMenu");
// const monpayRoutes = require("./routes/monpay");
// const ordersRoutes = require("./routes/orders");
// const orderRkeeperRoutes = require("./routes/orderRkeeper");
const settingsRoutes = require("./routes/settings");
const restaurantsRoutes = require("./routes/restaurants");

var cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");

// App-iin tohirgoog process.env ruu achaalah
dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();

// create a rotating write stream
var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

// cors tohirgoo
var whitelist = ["http://10.0.0.105:3000"];
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
app.use(helmet());
app.use(xss());

app.use(morgan("combined", { stream: accessLogStream }));

app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/hallplans", hallPlanRoutes);
app.use("/api/v1/tables", tableRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/menuitems", menuItemsRoutes);
app.use("/api/v1/price", priceRoutes);
app.use("/api/v1/settings", settingsRoutes);
// app.use("/api/v1/getorder", getOrderRoutes);
// app.use("/api/v1/monpay", monpayRoutes);
// app.use("/api/v1/orders", ordersRoutes);
// app.use("/api/v1/rkeeper", orderRkeeperRoutes);
app.use("/api/v1/restaurants", restaurantsRoutes);

app.use(errorHandler);

app.listen(
  process.env.PORT,
  console.log(`Express server ${process.env.PORT} deer aslaa...........`)
);

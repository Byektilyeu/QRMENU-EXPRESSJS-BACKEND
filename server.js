const express = require("express");
const dotenv = require("dotenv");
var path = require("path");
var rfs = require("rotating-file-stream");
const errorHandler = require("./middleware/error");
var morgan = require("morgan");
// const logger = require("./middleware/logger");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

// Router oruulj ireh
const menuRoutes = require("./routes/menu");
const injectDb = require("./middleware/injectDb");

var cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");

// App-iin tohirgoog process.env ruu achaalah
dotenv.config({ path: "./config/config.env" });

const app = express();
const db = require("./config/db-sqlite");

// create a rotating write stream
var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

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
// app.use(logger);
app.use(helmet());
app.use(xss());
// to  remove data, use
app.use(mongoSanitize());
// app.use(fileUpload());
// app ruu middleqare-iig holbohdoo USE gedgiig hereglene
app.use(injectDb(db));
app.use(morgan("combined", { stream: accessLogStream }));
// // use gedgiig ahsiglan turul buriin middleware-uudiig holboj uguh bolomjtoi

app.use("/api/v1/menu", menuRoutes);

app.use(errorHandler);

//mysql-tei sync hiij bna
db.sequelize
  .sync()
  .then((result) => {
    console.log("sync hiigdlee");
  })
  .catch((err) => console.log(err));

// db.sync({ force: true }).then(() => console.log("db is ready"));

app.listen(
  process.env.PORT,
  console.log(`Express server ${process.env.PORT} deer aslaa...........`)
);

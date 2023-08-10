const mongoose = require("mongoose");

// mongoDB өгөгдлийн сангийн холболт
const connectDB = async () => {
  mongoose.set("strictQuery", false);
  const conn = await mongoose.connect(
    "mongodb+srv://qrMenuOrders:qrMenuOrders2023@qrmenuorders.pkn07fr.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  console.log(`MongoDb holbogdloo : ${conn.connection.host}`);
};

module.exports = connectDB;

// const MongoConnect = async () => {
//   await mongoose
//     .connect(config.mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     })
//     .then(() => console.log("MongoDB Connected..."))
//     .catch((err) => console.log(err));
// };
// MongoConnect();

const mongoose = require("mongoose");

const connectDB = async () => {
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

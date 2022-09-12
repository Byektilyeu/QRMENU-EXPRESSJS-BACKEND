const Sequelize = require("sequelize");

var db = {};

const sequelize = new Sequelize("test-db", "user", "pass", {
  dialect: "sqlite",
  host: "./Menu.db",
});

const models = [
  require("../models/sequelize/Menu"),
  require("../models/sequelize/CategList"),
  require("../models/sequelize/MenuItems"),
  require("../models/sequelize/Price"),
  require("../models/sequelize/User"),
  require("../models/sequelize/RKOrderMenu"),
  require("../models/sequelize/Table"),
  require("../models/sequelize/HallPlans"),
];

models.forEach((model) => {
  const seqModel = model(sequelize, Sequelize);
  db[seqModel.name] = seqModel;
});

db.sequelize = sequelize;

module.exports = db;

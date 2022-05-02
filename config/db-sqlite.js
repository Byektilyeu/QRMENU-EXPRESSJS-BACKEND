const Sequelize = require("sequelize");

var db = {};

const sequelize = new Sequelize("test-db", "user", "pass", {
  dialect: "sqlite",
  host: "./dev.sqlite33",
});

const models = [require("../models/sequelize/menu")];

models.forEach((model) => {
  const seqModel = model(sequelize, Sequelize);
  db[seqModel.name] = seqModel;
});

db.sequelize = sequelize;

module.exports = db;

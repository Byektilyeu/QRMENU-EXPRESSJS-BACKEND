const jwt = require("jsonwebtoken");

const User = function (sequelize, DataTypes) {
  return sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(245),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.CHAR(10),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "User",
      timestamps: false,
    }
  );
};
User.prototype.getJsonWebToken = function () {
  const token = jwt.sign({ email: this.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

  return token;
};

module.exports = User;

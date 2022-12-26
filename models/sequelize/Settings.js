module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Settings",
    {
      rkApiUrl: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      restaurantCode: {
        type: DataTypes.STRING,
      },
      empID: {
        type: DataTypes.STRING,
      },
      stationID: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "Settings",
      timestamps: false,
    }
  );
};

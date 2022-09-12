module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "RKOrderMenu",
    {
      identOrderMenu: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
      },
      priceOrderMenu: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "RKOrderMenu",
      timestamps: false,
    }
  );
};

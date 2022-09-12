module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Price",
    {
      menuPriceIdent: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
      },
      menuPriceItemIdent: {
        type: DataTypes.INTEGER,
      },
      menuPriceValue: {
        type: DataTypes.INTEGER,
      },
      menuPriceObjectID: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "Price",
      timestamps: false,
    }
  );
};

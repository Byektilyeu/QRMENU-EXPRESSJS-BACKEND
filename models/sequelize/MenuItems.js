module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "MenuItems",
    {
      Name: {
        type: DataTypes.STRING,
      },
      menuIdent: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
      },
      Code: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      AltName: {
        type: DataTypes.STRING,
      },
      ModiScheme: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      MainParentIdent: {
        type: DataTypes.INTEGER,
      },
      Comment: {
        type: DataTypes.STRING,
      },
      genname0450: {
        type: DataTypes.STRING,
      },
      genname0409: {
        type: DataTypes.STRING,
      },
      genForWeb: {
        type: DataTypes.STRING,
      },
      genSortForWeb: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "MenuItems",
      timestamps: false,
    }
  );
};

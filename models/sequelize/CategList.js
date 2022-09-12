module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "CategList",
    {
      Name: {
        type: DataTypes.STRING,
      },
      Ident: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
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
    },
    {
      sequelize,
      tableName: "CategList",
      timestamps: false,
    }
  );
};

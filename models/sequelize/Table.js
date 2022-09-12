module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Table",
    {
      tablesIdent: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
      },
      TablesMainParentIdent: {
        type: DataTypes.INTEGER,
      },
      TablesCode: {
        type: DataTypes.INTEGER,
      },
      TablesName: {
        type: DataTypes.STRING(20),
      },
    },
    {
      sequelize,
      tableName: "Table",
      timestamps: false,
    }
  );
};

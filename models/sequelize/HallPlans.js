module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "HallPlans",
    {
      HallPlansMainParentIdent: {
        type: DataTypes.INTEGER,
      },
      hallPlansIdent: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "HallPlans",
      timestamps: false,
    }
  );
};

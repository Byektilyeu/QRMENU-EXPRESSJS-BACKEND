module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Menu",
    {
      Name: {
        type: DataTypes.STRING,
        references: {
          model: "MenuItems",
          key: "Name",
        },
      },
      menuIdent: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "MenuItems",
          key: "menuIdent",
        },
      },
      Code: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "MenuItems",
          key: "Code",
        },
      },
      AltName: {
        type: DataTypes.STRING,
        references: {
          model: "MenuItems",
          key: "AltName",
        },
      },
      Comment: {
        type: DataTypes.STRING,
        references: {
          model: "MenuItems",
          key: "Comment",
        },
      },
      MainParentIdent: {
        type: DataTypes.STRING,
        references: {
          model: "MenuItems",
          key: "MainParentIdent",
        },
      },
      category: {
        type: DataTypes.INTEGER.UNSIGNED,
        ref: "Category",
        required: true,
      },
    },
    {
      sequelize,
      tableName: "Menu",
      timestamps: false,
    }
  );
};

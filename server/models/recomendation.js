"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recomendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recomendation.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      Recomendation.belongsTo(models.Movie, {
        foreignKey: "MovieId",
      });
    }
  }
  Recomendation.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      MovieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Reason cannot empty",
          },
          notEmpty: {
            msg: "Reason cannot empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Recomendation",
    }
  );
  return Recomendation;
};

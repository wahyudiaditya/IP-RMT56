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
      UserId: DataTypes.INTEGER,
      MovieId: DataTypes.INTEGER,
      reason: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Recomendation",
    }
  );
  return Recomendation;
};

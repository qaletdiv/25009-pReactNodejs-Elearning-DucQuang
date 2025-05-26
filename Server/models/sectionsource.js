"use strict";
const { Model, DataTypes } = require("sequelize");
const course = require("./course");

module.exports = (sequelize, DataTypes) => {
  class SectionSource extends Model {
    static associate(model) {
      SectionSource.hasOne(model.Section, {
        foreignKey: "sourceId",
        as: "section",
      });
    }
  }
  SectionSource.init(
    {
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "SectionSource",
      tableName: "SectionSources",
      timestamps: true,
    }
  );
  return SectionSource;
};

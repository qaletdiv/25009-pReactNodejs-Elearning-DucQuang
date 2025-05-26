"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    static associate(model) {
      Section.belongsTo(model.SectionSource, {
        foreignKey: "sourceId",
        as: "source",
      });
      Section.belongsTo(model.Course, {
        foreignKey: "courseId",
        as: "course",
      });
    }
  }
  Section.init(
    {
      sectionName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sourceId: {
        type: DataTypes.INTEGER,
      },
      courseId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Section",
      tableName: "Sections",
      timestamps: true,
    }
  );
  return Section;
};

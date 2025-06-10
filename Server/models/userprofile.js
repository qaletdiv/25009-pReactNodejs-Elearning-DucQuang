"use strict";
const { Model, DataTypes } = require("sequelize");
const course = require("./course");

module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    static associate(model) {
      UserProfile.belongsTo(model.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  UserProfile.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "UserProfile",
      tableName: "UserProfiles",
      timestamps: true,
    }
  );
  return UserProfile;
};

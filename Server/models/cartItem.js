"use strict" 
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(model) {
      CartItem.belongsTo(model.Cart, {
        foreignKey: "cartId",
        as: "cart",
      });
      CartItem.belongsTo(model.Course, {
        foreignKey: "courseId",
        as: "course",
      })
    }
  }
  CartItem.init(
    {
      cartId: {
        type: DataTypes.INTEGER,
      },
      courseId: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: "CartItem",
      tableName: "CartItems",
      timestamps: true,
    }
  );
  return CartItem;
};

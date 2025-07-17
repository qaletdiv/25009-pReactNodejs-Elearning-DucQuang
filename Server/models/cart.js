"use strict" 
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(model) {
      Cart.belongsTo(model.User, {
        foreignKey: "userId",
        as: "user",
      });
      Cart.hasMany(model.CartItem, {
        foreignKey: "cartId",
        as: "items",
      })
    }
  }
  Cart.init(
    {
      userId: {
        type: DataTypes.INTEGER,
      },    
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "Carts",
      timestamps: true,
    }
  );
  return Cart;
};

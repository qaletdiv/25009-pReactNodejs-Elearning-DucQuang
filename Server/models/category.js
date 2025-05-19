'use strict'

const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(model) {
            Category.hasMany(model.Course, {
                foreignKey: 'categoryId', 
                as: 'courses'
            })
        }
    }
    Category.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        description: {
            type: DataTypes.TEXT, 
        }, 
    }, {
        sequelize,
        modelName: 'Category', 
        tableName: 'Categories',
        timestamps: true, 
    })
    return Category;
}
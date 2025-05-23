'use strict'

const {Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        static associate(model) {
            Course.belongsTo(model.User, {
                foreignKey: 'userId', 
                as: 'user'
            })
            Course.belongsTo(model.Category, {
                foreignKey: 'categoryId', 
                as: 'category'
            })
            Course.belongsToMany(model.User, {
                through: model.Enrollment, 
                foreignKey: 'courseId', 
                otherKey: 'userId', 
                as: 'users'
            })
        }
    }
    Course.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        image: {
            type: DataTypes.STRING, 
        }, 
        description: {
            type: DataTypes.TEXT, 
        }, 
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }, 
        userId: {
            type: DataTypes.INTEGER, 
        },
        categoryId: {
            type: DataTypes.INTEGER, 
        }
    }, {
        sequelize,
        modelName: 'Course', 
        tableName: 'Courses',
        timestamps: true, 
    })
    return Course;
}
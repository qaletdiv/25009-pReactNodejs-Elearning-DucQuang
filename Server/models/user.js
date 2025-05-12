'use strict'
const {Model, DataTypes} = require("sequelize"); 


module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(model) {

        }
    }
    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        email: {
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: true
        }, 
        password: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        role: {
            type: DataTypes.ENUM('admin', 'user', 'instructor'),
            defaultValue: 'user', 
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'User', 
        tableName: 'Users',
        timestamps: true, 
        defaultScope: {
            attributes: { exclude: ['password']}
        }, 
        scopes: {
            withPassword: {
                attributes: {},
            }
        }
    })
    return User;
}
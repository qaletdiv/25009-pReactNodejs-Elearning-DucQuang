"use strict"

const Sequelize = require("sequelize"); 
const env = process.env.NODE_ENV || "development"; 
const config = require(__dirname + "/../config/config.js")[env]; 
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username, 
    config.password,
    config
); 
db.User = require('./user')(sequelize, Sequelize)
db.Category = require('./category')(sequelize, Sequelize)
db.Enrollment = require('./enrollment')(sequelize, Sequelize)
db.Course = require('./course')(sequelize, Sequelize)
db.Level = require('./level')(sequelize, Sequelize)
db.Review = require('./review')(sequelize, Sequelize)
db.SectionSource = require('./sectionsource')(sequelize, Sequelize)
db.Section = require('./section')(sequelize, Sequelize)
db.Video = require('./videos')(sequelize, Sequelize)
db.VideoCompleted = require('./videocompleted')(sequelize, Sequelize)
Object.keys(db).forEach((modelName) => {
    if(db[modelName].associate) {
        db[modelName].associate(db);
    }
}); 

db.sequelize = sequelize; 
db.Sequelize = Sequelize; 
module.exports = db;
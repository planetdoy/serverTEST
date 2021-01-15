const Sequelize = require('sequelize');
// const User = require('./user');
// const Comment = require('./comment')

// table 연결
const Company = require('./company');
const Car = require('./car');
const File = require('./file');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

//모델 생성 후
db.Company = Company;
db.Car = Car;
db.File = File;

// db.User = User;
// db.Comment = Comment;

Company.init(sequelize);
Car.init(sequelize);
File.init(sequelize);
// User.init(sequelize);
// Comment.init(sequelize);

Company.associate(db);
Car.associate(db);
File.associate(db);
// User.associate(db);
// Comment.associate(db);

module.exports = db;
require('dotenv').config();
module.exports= {
  development: {
    username: 'root',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'rentcar',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'nodejs',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false, //배포시에는 쿼리문을 숨기는게 좋다
  }
}

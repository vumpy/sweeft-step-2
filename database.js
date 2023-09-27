const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:root@localhost:5432/postgres2")

// const sequelize = new Sequelize("postgres", "postgres", "root", {
//     host: "db",
//     dialect: "postgres",
//     pool: {
//       max: 9,
//       min: 0,
//       idle: 10000
//     }
//   });
  

module.exports = sequelize;
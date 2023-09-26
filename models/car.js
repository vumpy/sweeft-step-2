const Sequelize = require("sequelize");
const sequelize = require("../database");

const Car = sequelize.define("car", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    plate: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    type: {
        type: Sequelize.STRING,
    },

    userid: {
        type: Sequelize.INTEGER,
    },

});

module.exports = Car;
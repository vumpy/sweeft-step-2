const Sequelize = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    balance: {
        type: Sequelize.INTEGER,
        defaultValue: 100,
    },
    isadmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }

});

module.exports = User;
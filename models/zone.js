const Sequelize = require("sequelize");
const sequelize = require("../database");

const Zone = sequelize.define("zone", {
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

    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    fair: {
        type: Sequelize.INTEGER,
    },

});

module.exports = Zone;
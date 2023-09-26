const Sequelize = require("sequelize");
const sequelize = require("../database");

const History = sequelize.define("history", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    zoneid: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    carid: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    userid: {
        type: Sequelize.INTEGER,
    },
    
    isactive: {
        type: Sequelize.BOOLEAN,
    }

});

module.exports = History;
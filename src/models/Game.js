const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Game = sequelize.define('game', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING,
        allowNull:false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //! categoryId
});

module.exports = Game;
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const GameImg = sequelize.define('gameImg', {
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    publicId: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    //gameId
});

module.exports = GameImg;
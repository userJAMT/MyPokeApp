const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('type', {
        //id: {} lo crea sequelize automaticamente
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {timestamps: false})
}
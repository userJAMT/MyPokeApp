const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('pokemon', {

    id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("name", value.toLowerCase());
      }
    },

    img: {
      type: DataTypes.TEXT
    },

    hp: {
      type: DataTypes.INTEGER,
    },
    
    attack: {
      type: DataTypes.INTEGER,
    },

    defense: {
      type: DataTypes.INTEGER,
    },

    speed: {
      type: DataTypes.INTEGER,
    },

    weight: {
      type: DataTypes.FLOAT,
    },

    height: {
      type: DataTypes.FLOAT,
    }
  },{timestamps: false});
};

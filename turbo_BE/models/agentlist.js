'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agentlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Agentlist.init({
    agent_name: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    dp_phone: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    target_id: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    agent_type: {
      type:DataTypes.STRING,
      allowNull:false,
    },
     status: {
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:0
    },
  }, {
    sequelize,
    tableName: 'Agentlists',
    modelName: 'Agentlist',
  });
  return Agentlist;
};
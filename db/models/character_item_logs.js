'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class characterItemLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  characterItemLogs.init({
    is_active: DataTypes.ENUM('Y', 'N'),
  }, {
    timestamps: true,
    sequelize,
    modelName: 'character_item_logs',
  });

  return characterItemLogs;
};
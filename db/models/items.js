'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  items.init({
    timestamps: false,
    todo_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    updated_at: DataTypes.DATE,
    is_complete: DataTypes.ENUM,
    completed_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'items',
  });
  return items;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  todos.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING(45)
  }, {
    timestamps: false,
    sequelize,
    modelName: 'todos',
  });
  return todos;
};
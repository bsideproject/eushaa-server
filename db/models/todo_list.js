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

      this.hasMany(models.TodoItem, { foreignKey: 'todo_id', sourceKey: 'id' });
      this.belongsTo(models.User, { foreignKey: 'user_id', sourceKey: 'id' })
    }
  };
  todos.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING(45),
    is_complete: DataTypes.ENUM('Y', 'N'),
    completed_at: DataTypes.DATE,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'todo_list',
    tableName: 'todos',
  });
  return todos;
};
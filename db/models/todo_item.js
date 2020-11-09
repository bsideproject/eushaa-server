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
      this.belongsTo(models.TodoList, { foreignKey: 'todo_id', targetKey: 'id' });
    }
  };
  items.init({
    todo_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    updated_at: DataTypes.DATE,
    is_complete: DataTypes.ENUM('Y', 'N'),
    completed_at: DataTypes.DATE
  }, {
    timestamps: false,
    sequelize,
    modelName: 'todo_item',
    tableName: 'items',
  });



  return items;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class spaceItemLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
			this.belongsTo(models.teams, { foreignKey: 'team_id', targetKey: 'id' });
			this.belongsTo(models.space_items, { foreignKey: 'item_id', targetKey: 'id' });
			this.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });
    }
  };
  spaceItemLog.init({
    team_id: { type: DataTypes.INTEGER, allowNull: false },
		item_id: { type: DataTypes.INTEGER, allowNull: false },
		user_id: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
  }, {
    timestamps: false,
    sequelize,
    modelName: 'space_item_log',
  });

  return spaceItemLog;
};
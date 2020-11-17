'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class spaceItems extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Levels, { foreignKey: 'level_id', targetKey: 'id' });
			this.hasMany(models.SpaceItemLog, { foreignKey: 'item_id', sourceKey: 'id' });
		}
	}
	spaceItems.init(
		{
			level_id: { type: DataTypes.INTEGER, allowNull: false },
			name: { type: DataTypes.STRING(127), unique: true },
			pos_x: DataTypes.FLOAT,
			pos_y: DataTypes.FLOAT,
			deactivate_image: DataTypes.STRING(255),
			activate_image: DataTypes.STRING(255),
		},
		{
			timestamps: false,
			sequelize,
			modelName: 'space_items',
		}
	);

	return spaceItems;
};

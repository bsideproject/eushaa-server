'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class teams extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.User, { foreignKey: 'team_id', sourceKey: 'id' });
			this.hasMany(models.SpaceItemLog, { foreignKey: 'team_id', sourceKey: 'id' });
			this.belongsTo(models.TeamTypes, { foreignKey: 'team_type_id', sourceKey: 'id' });
		}
	}
	teams.init(
		{
			level: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
			gauge: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
			created_at: {
				type: DataTypes.DATE,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
		},
		{
			timestamps: false,
			sequelize,
			modelName: 'teams',
		}
	);

	return teams;
};

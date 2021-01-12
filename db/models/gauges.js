'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Gauges extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Gauges.init(
		{
			level: { type: DataTypes.INTEGER, allowNull: false },
			guage: { type: DataTypes.INTEGER, allowNull: false },
			image: DataTypes.STRING(255),
		},
		{
			timestamps: false,
			sequelize,
			modelName: 'guages',
		}
	);

	return Gauges;
};

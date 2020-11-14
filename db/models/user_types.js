'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class userTypes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	userTypes.init(
		{
			type: { type: DataTypes.STRING(63), allowNull: false, unique: true },
		},
		{
			timestamps: false,
			sequelize,
			modelName: 'user_types',
		}
	);

	return userTypes;
};

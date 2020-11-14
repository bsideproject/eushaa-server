module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'user',
		{
			email: {
				type: DataTypes.STRING(50),
				allowNull: false,
				unique: true,
			},
			name: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING(73),
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};

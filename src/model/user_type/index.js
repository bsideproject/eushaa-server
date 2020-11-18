const { UserTypes, User } = require('../../../db/models');

exports.getByUserId = async (userId) => {
	const { user_type } = await User.findOne({
		include: {
			model: UserTypes,
			as: 'user_type',
		},
		where: {
			id: userId,
		},
	});
	return user_type;
};

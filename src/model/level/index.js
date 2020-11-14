const { Levels } = require('../../../db/models');

exports.get = async ({ levelNumber }) => {
	const level = await Levels.findOne({
		where: {
			level: levelNumber,
		},
	});
	return level;
};

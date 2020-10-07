const { Items } = require('../../../db/models');

exports.getItems = async todo_id => {
	try {
		const items = await Items.findAll({
			where: {
				todo_id
			}
		})
		return items;
	} catch (err) {
		console.error(err);
	}
}

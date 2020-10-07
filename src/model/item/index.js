const { Todos, Items } = require('../../../db/models');

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

exports.getTodoItems = async (user_id, title) => {
	try {
		const items = await Items.findAll({
			include: {
				model: Todos,
				where: { user_id, title },
			},
		})
		return items
	} catch (err) {
		console.error(err)
	}
}

exports.removeItem = async id => {
	try {
		const result = await Items.destroy({
			where: {
				id
			}
		})
		return result
	} catch (err) {
		console.error(err)
	}
}

exports.removeItemsAll = async todo_id => {
	try {
		const result = await Items.destroy({
			where: {
				todo_id
			}
		})
		return result
	} catch (err) {
		console.error(err)
	}
}

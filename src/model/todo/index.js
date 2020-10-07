const { Todos } = require('../../../db/models');

exports.getTodos = async user_id => {
	try {
		const todos = await Todos.findAll({
			where: {
				user_id
			}
		})
		return todos
	} catch (err) {
		console.error(err)
	}
}

exports.getTodo = async (user_id, title) => {
	try {
		const todo = await Todos.findOne({
			where: {
				user_id,
				title
			}
		})
		return todo
	} catch (err) {
		console.error(err)
	}
}

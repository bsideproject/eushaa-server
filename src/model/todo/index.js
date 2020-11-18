const {
	TodoList,
	Sequelize: { Op },
} = require('../../../db/models');

const { styleHyphenFormat } = require('../../lib/util');

exports.insert = async ({ userId, title }) => {
	const [todo, result] = await TodoList.findOrCreate({
		where: {
			user_id: userId,
			title,
		}
	});
	return todo;
};

exports.update = async (id, updateData) => {
	updateData = Object.entries(updateData)
		.map(([k, v]) => [styleHyphenFormat(k), v])
		.reduce((acc, [k, v]) => {
			acc[k] = v;
			return acc;
		}, {});
	updateData.is_complete === 'Y' ? (updateData.completed_at = new Date().toISOString()) : void 0;
	const [result, todo] = await TodoList.update(updateData, { where: { id } });
	return result;
};

// exports.updateTitle = async ({ id, title }) => {
//     const todo = await Todos.update({
//         title
//     }, { where: { id } })
//     return todo;
// }

exports.getTodos = async (user_id, start, count) => {
	try {
		const where = start
			? {
					[Op.and]: [{ title: { [Op.gte]: start } }, { user_id }],
			  }
			: { user_id };
		const limit = count ? { limit: count } : {};
		const todos = await TodoList.findAll({
			where,
			order: [['title', 'DESC']],
			...limit,
		});
		return todos;
	} catch (err) {
		console.error(err);
		return null;
	}
};

exports.getTodo = async (user_id, title) => {
	try {
		const todo = await TodoList.findOne({
			where: {
				user_id,
				title,
			},
		});
		return todo;
	} catch (err) {
		console.error(err);
		return null;
	}
};

exports.removeTodo = async (id) => {
	try {
		const result = await TodoList.destroy({
			where: {
				id,
			},
		});
		return result;
	} catch (err) {
		console.error(err);
		return false;
	}
};

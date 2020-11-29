const { TodoItem } = require('../../../db/models');

const { styleHyphenFormat } = require('../../lib/util');

exports.insert = async ({ todoListId, content }) => {
	const item = await TodoItem.create({
		todo_id: todoListId,
		content,
	});
	return item.dataValues;
};

exports.insertList = async ({ todoListId, addContents }) => {

	try {
		let records = addContents.map(content => ({
			todo_id: todoListId,
			content
		}))

		const result = await TodoItem.bulkCreate(records)
		return true
	} catch (err) {
		console.log(err)
		return false
	}
}

exports.update = async (id, updateData) => {

	updateData = Object.entries(updateData)
		.filter(([k, v]) => v)
		.map(([k, v]) => [styleHyphenFormat(k), v])
		.reduce((acc, [k, v]) => {
			acc[k] = v;
			return acc;
		}, {});
	updateData.content ? (updateData.updated_at = new Date().toISOString()) : void 0;
	updateData.is_complete === 'Y' ? (updateData.completed_at = new Date().toISOString()) : void 0;


	const [result] = await TodoItem.update(updateData, { where: { id } });

	const todoItem = result === 1 ? await TodoItem.findOne({ where: { id } }) : null;

	return todoItem
};

// exports.updateContent = async ({ id, content }) => {
//     const item = await Items.update({
//         content
//     }, { where: { id } })
//     return item;
// }

// exports.updateComplete = async ({ id, isComplete, completedAt }) => {

//     const item = await Items.update({
//         is_complete: isComplete,
//         completed_at: completedAt
//     }, { where: { id } })
//     return item;
// }

exports.getItems = async (todo_id) => {
	try {
		const items = await TodoItem.findAll({
			where: {
				todo_id,
			},
		});
		return items;
	} catch (err) {
		console.error(err);
		return null;
	}
};

// exports.getTodoItems = async (user_id, title) => {
//     try {
//         const items = await Items.findAll({
//             include: {
//                 model: Todos,
//                 where: { user_id, title },
//             },
//         })
//         return items
//     } catch (err) {
//         console.error(err)
//     }
// }

exports.removeItem = async (id) => {
	try {
		const result = await TodoItem.destroy({
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

exports.removeItems = async ({ todoListId, removeIdList }) => {
	try {
		const result = await TodoItem.destroy({
			where: { todo_id: todoListId, id: removeIdList }
		})
		return true
	} catch (err) {
		console.error(err)
		return false
	}
}

exports.removeItemsAll = async (todo_id) => {
	try {
		const result = await TodoItem.destroy({
			where: {
				todo_id,
			},
		});
		return result;
	} catch (err) {
		console.error(err);
		return false;
	}
};

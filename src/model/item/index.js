const { todos, items } = require('../../../db/models');

const { styleHyphenFormat } = require('../../lib/util')

exports.insert = async ({ todoId, content }) => {

    const item = await Items.create({
        todo_id: todoId,
        content
    })
    return item.dataValues;
}

exports.update = async (id, updateData) => {
    updateData = Object.entries(updateData)
        .filter(([k, v]) => v)
        .map(([k, v]) => [styleHyphenFormat(k), v])
        .reduce((acc, [k, v]) => {
            acc[k] = v
            return acc;
        }, {})
    const [result, item] = await Items.update(updateData, { where: { id } })
    return result;
}

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

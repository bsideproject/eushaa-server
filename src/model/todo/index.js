const { Todos } = require('../../../db/models');


const { styleHyphenFormat } = require('../../lib/util')

exports.insert = async ({ userId, title }) => {

    const todo = await Todos.create({
        user_id: userId,
        title
    })
    return todo.dataValues
}

exports.update = async (id, updateData) => {
    updateData = Object.entries(updateData)
        .map(([k, v]) => [styleHyphenFormat(k), v])
        .reduce((acc, [k, v]) => {
            acc[k] = v
            return acc;
        }, {})
    const [result, todo] = await Todos.update(updateData, { where: { id } })
    return result;
}

// exports.updateTitle = async ({ id, title }) => {
//     const todo = await Todos.update({
//         title
//     }, { where: { id } })
//     return todo;
// }

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

exports.removeTodo = async id => {
    try {
        const result = await Todos.destroy({
            where: {
                id
            }
        })
        return result
    } catch (err) {
        console.error(err)
    }
}


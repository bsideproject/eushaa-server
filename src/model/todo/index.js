const { Todos } = require('../../../db/models');

const { styleHyphenFormat } = require('../../lib/util')

exports.insert = async ({ userId, title }) => {

    const todo = await Todos.create({
        user_id: userId,
        title
    })
    return todo;
}

exports.update = async (id, updateData) => {
    updateData = Object.entries(updateData)
        .map(([k, v]) => [styleHyphenFormat(k), v])
        .reduce((acc, [k, v]) => {
            acc[k] = v
            return acc;
        })
    const todo = await Todos.update(updateData, { where: { id } })
    return todo;
}

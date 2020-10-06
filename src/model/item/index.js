const { Items } = require('../../../db/models');

const { styleHyphenFormat } = require('../../lib/util')

exports.insert = async ({ todoId, content }) => {

    const item = await Items.create({
        todo_id: todoId,
        content
    })
    return item;
}

exports.update = async (id, updateData) => {
    updateData = Object.entries(updateData)
        .map(([k, v]) => [styleHyphenFormat(k), v])
        .reduce((acc, [k, v]) => {
            acc[k] = v
            return acc;
        })
    const item = await Items.update(updateData, { where: { id } })
    return item;
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


const { Items } = require('../../../db/models');

const { styleHyphenFormat } = require('../../lib/util')

exports.insert = async ({ todoId, content }) => {

    const item = await Items.create({
        todo_id: todoId,
        content
    })
    return item;
}



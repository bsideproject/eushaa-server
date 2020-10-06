const { Todos } = require('../../../db/models');

exports.insert = async ({ userId, title }) => {

    const todo = await Todos.create({
        user_id: userId,
        title
    })
    return todo;
}



const { insertUser, selectUser, autheticate } = require('../model/user')
const item = require('../model/item')
const todo = require('../model/todo')

const resolvers = {
    Query: {
        login: (_, { email, password }) => selectUser(email, password),
        isLogin: (_, { authorization }) => autheticate(authorization),
    },
    Mutation: {
        signup: (_, { email, name, password }) => insertUser(email, name, password),

        makeTodo: (_, { userId, title }) => todo.insert({ userId, title }),
        updateTodo: (_, { id, userId, title }) => todo.update(id, { userId, title }),

        makeItem: (_, { todoId, content }) => item.insert({ todoId, content }),
        updateItem: (_, { id, todoId, content, isComplete, completedAt }) => item.update(id, { todoId, content, isComplete, completedAt }),
    }
};

module.exports = resolvers;

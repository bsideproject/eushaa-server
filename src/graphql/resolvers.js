const { insertUser, selectUser, autheticate } = require('../model/user')
const item = require('../model/item')
const todo = require('../model/todo')
const spaceItem = require('../model/space_item')

const resolvers = {
    Query: {
        login: (_, { email, password }) => selectUser(email, password),
        isLogin: (_, { authorization }) => autheticate(authorization),

        todos: (_, { user_id }) => todo.getTodos(user_id),
        todo: (_, { user_id, title }) => todo.getTodo(user_id, title),

        items: (_, { todo_id }) => item.getItems(todo_id),
        todoLists: (_, { user_id, title }) => item.getTodoItems(user_id, title),

        getSpaceItemsByLevel: (_, { levelId }) => spaceItem.getSpaceItemsByLevel({ levelId }),
        getSpaceItemsByTeam: (_, { teamId, levelId }) => spaceItem.getSpaceItemsByTeam({ teamId, levelId })
    },
    Mutation: {
        signup: (_, { email, name, password }) => insertUser(email, name, password),

        makeTodo: (_, { userId, title }) => todo.insert({ userId, title }),
        updateTodo: (_, { id, title }) => todo.update(id, { title }),
        deleteTodo: (_, { id }) => {
            const result = todo.removeTodo(id)
            if (result) {
                item.removeItemsAll(id)
            }
            return result
        },

        makeItem: (_, { todoId, content }) => item.insert({ todoId, content }),
        updateItem: (_, { id, content, isComplete, completedAt }) => item.update(id, { content, isComplete, completedAt }),
        deleteItem: (_, { id }) => item.removeItem(id),
    }
};

module.exports = resolvers;

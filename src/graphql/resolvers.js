const { insertUser, selectUser, autheticate } = require('../model/user')
const item = require('../model/item')
const todo = require('../model/todo')

const resolvers = {
    Query: {
		login: (_, { email, password }) => selectUser(email, password),
		isLogin: (_, { authorization }) => autheticate(authorization),

		todos: (_, { user_id }) => todo.getTodos(user_id),
		todo: (_, { user_id, title }) => todo.getTodo(user_id, title),

		items: (_, { todo_id }) => item.getItems(todo_id),
		todoLists: (_, { user_id, title }) => item.getTodoItems(user_id, title),
    },
    Mutation: {
		  signup: (_, { email, name, password }) => insertUser(email, name, password),
      
      makeTodo: (_, { userId, title }) => todo.insert({ userId, title }),
      updateTodo: (_, { id, userId, title }) => todo.update(id, { userId, title }),
      deleteTodo: (_, { id }) => {
			  const result = todo.removeTodo(id)
			  if (result) {
				  item.removeItemsAll(id)
			  }
			  return result
		  },
      
      makeItem: (_, { todoId, content }) => item.insert({ todoId, content }),
      updateItem: (_, { id, todoId, content, isComplete, completedAt }) => item.update(id, { todoId, content, isComplete, completedAt }),
		  deleteItem: (_, { id }) => item.removeItem(id),
    }
};

module.exports = resolvers;

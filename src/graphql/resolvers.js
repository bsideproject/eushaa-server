const user= require('../model/user')
const item = require('../model/item')
const todo = require('../model/todo')
const spaceItem = require('../model/space_item')

const level = require('../model/level')
const spaceItemLog = require('../model/space_item_log')
const team = require('../model/team')
const userType = require('../model/user_type')
const teamType = require('../model/team_type')

const character = require('../model/character')
const characterItem = require('../model/character_item')
const characterItemLog = require('../model/character_item_log')

const resolvers = {
    Query: {

        user:(_, {id}) => user.get(id),

        login: (_, { email, password }) => user.selectUser(email, password),
        isLogin: (_, { authorization }) => user.autheticate(authorization),

        todoLists: (_, { userId, start, count }) => todo.getTodos(userId, start, count),
        todoList: (_, { userId, title }) => todo.getTodo(userId, title),

        todoItems: (_, { todoId }) => item.getItems(todoId),


        getSpaceItemsByLevel: (_, { levelId }) => spaceItem.getSpaceItemsByLevel({ levelId }),
      
        level: (_, { levelNumber }) => level.get({ levelNumber }),

        team: (_, { id }) => team.get(id),
        teamByUser:(_, { user_id }) => team.getTeamByUserId(user_id),
        members: (_, { team_id }) => team.getUsersByTeamId(team_id),


    },
    Mutation: {

        signup: (_, { email, name, password }) => user.insertUser(email, name, password),
        updateUser:(_, {id, name, team_id, type}) => user.update(id, {name, team_id, type}),

        makeTodoList: (_, { userId, title }) => todo.insert({ userId, title }),
        updateTodoList: (_, { id, title, isComplete }) => todo.update(id, { title, isComplete }),
        deleteTodoList: (_, { id }) => todo.removeTodo(id),

        addTodoItem: (_, { todoListId, content }) => item.insert({ todoListId, content }),
        updateTodoItem: (_, { id, content, isComplete }) => item.update(id, { content, isComplete }),
        deleteTodoItem: (_, { id }) => item.removeItem(id),

        //space item log
        spaceItemLog: (_, { teamId, userId, itemId }) => spaceItemLog.insert({ teamId, userId, itemId }),

        makeTeam: (_,{type}) => team.insert(type),
        participateTeam: (_, { user_id, team_id }) => user.participateTeam(user_id, team_id),
        updateTeam: (_, { id, level, gauge }) => team.update(id, { level, gauge }),
        increaseValues: (_, { id, keys }) => team.increase(id, keys),
        deleteTeam: (_, { id }) => team.removeTeam(id),

        characterItemLog: (_, { userId, characterItemId }) => characterItemLog.insert(userId, characterItemId),
        setCharacterItem: (_, { userId, characterItemId, isActive }) => characterItemLog.setActive(userId, characterItemId, isActive),

    },
    User: {
        todoList: (user) => {
			const today = new Date();
			let month = today.getMonth() + 1;
			month = month < 10 ? '0' + month : month;
			let day = today.getDate();
			day = day >= 10 ? day : '0' + day;
			const title = today.getFullYear() + '/' + month + '/' + day;
            return todo.getTodo(user.id, title)
        },
        team: (user) => {
            return team.getTeamByUserId(user.id);
        },
        userType: (user) => {
            return userType.getByUserId(user.id)
        }
    },
    TodoList: {
		user: (todoList) => user.get(todoList.user_id),
			todoItems: (todoList) => item.getItems(todoList.id),
    },
    Team: {
        members: ({id}) => team.getUsersByTeamId(id),
        teamType: ({id}) => teamType.getByTeamId(id),
        spaces: ({id}) => spaceItem.getAllSpaceItemsByTeam(id)
    }
    
};

module.exports = resolvers;

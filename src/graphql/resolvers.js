const user = require('../model/user');
const item = require('../model/item');
const todo = require('../model/todo');
const spaceItem = require('../model/space_item');

const level = require('../model/level');
const spaceItemLog = require('../model/space_item_log');
const team = require('../model/team');
const userType = require('../model/user_type');
const teamType = require('../model/team_type');
const character = require('../model/character');
const gaugeModel = require('../model/gauge')

const resolvers = {

	Query: {

		user: (_, { id }) => user.get(id),
		userByEmail: (_, { email }) => user.getByEmail(email),

		login: (_, { email, password }) => user.selectUser(email, password),
		isLogin: (_, { authorization }) => user.autheticate(authorization),

		todoLists: (_, { userId, start, count }) => todo.getTodos(userId, start, count),
		todoList: (_, { userId, title }) => todo.getTodo(userId, title),

		todoItems: (_, { todoId }) => item.getItems(todoId),


		getSpaceItemsByLevel: (_, { levelId }) => spaceItem.getSpaceItemsByLevel({ levelId }),

		level: (_, { levelNumber }) => level.get({ levelNumber }),

		team: (_, { id }) => team.get(id),
		teamByUser: (_, { user_id }) => team.getTeamByUserId(user_id),
		members: (_, { team_id }) => team.getUsersByTeamId(team_id),


	},
	Mutation: {

		signup: (_, { email, name, password }) => user.insertUser(email, name, password),
		updateUser: (_, { id, name, team_id, type }) => user.update(id, { name, team_id, type }),
		matchTeam: (_, { userId, type }) => user.matchTeam(userId, type),


		makeTodoList: (_, { userId, title }) => {
			if (!/^\d{4}-\d{2}-\d{2}$/.test(title)) {
				throw new Error("입력 값이 올바른 형식이 아닙니다.")
			}
			return todo.insert({ userId, title })
		},
		updateTodoList: (_, { id, title, isComplete }) => todo.update(id, { title, isComplete }),
		deleteTodoList: (_, { id }) => todo.removeTodo(id),
		setTodoItems: (_, { todoListId, addContents, removeIdList }) => {
			let errorCnt = 0
			if (addContents && addContents.length > 0) {
				item.insertList({ todoListId, addContents }).then(result => {
					result ? void 0 : errorCnt += 1
				})
			}
			if (removeIdList && removeIdList.length > 0) {
				item.removeItems({ todoListId, removeIdList }).then(result => {
					result ? void 0 : errorCnt += 1
				})
			}
			if (errorCnt === 0)
				return true
			return false
		},

		addTodoItem: (_, { todoListId, content }) => item.insert({ todoListId, content }),
		updateTodoItem: (_, { id, content, isComplete }) => item.update(id, { content, isComplete }),
		deleteTodoItem: (_, { id }) => item.removeItem(id),

		//space item log
		addSpaceItemLog: (_, { teamId, userId, itemId }) => spaceItemLog.insert({ teamId, userId, itemId }),
		addCharacterItem: (_, { userId, itemId }) => character.insertLog({ userId, itemId }),

		updateCharacterItemStatus: (_, { userId, itemId, isActive }) => character.updateCharacterItemStatus({ userId, itemId, isActive }),

		makeTeam: (_, { type }) => team.insert(type),
		participateTeam: (_, { user_id, team_id }) => user.participateTeam(user_id, team_id),
		updateTeam: (_, { id, level, gauge }) => team.update(id, { level, gauge }),
		increaseValues: (_, { id, keys }) => team.increase(id, keys),
		deleteTeam: (_, { id }) => team.removeTeam(id),

	},
	User: {
		todoList: (user) => {
			const today = new Date();
			let month = today.getMonth() + 1;
			month = month < 10 ? '0' + month : month;
			let day = today.getDate();
			day = day >= 10 ? day : '0' + day;
			const title = today.getFullYear() + '-' + month + '-' + day;
			return todo.getTodos(user.id);
		},
		team: (user) => {
			return team.getTeamByUserId(user.id);
		},
		userType: (user) => {
			return userType.getByUserId(user.id);
		},
		character: (user) => {
			return character.getByUserId(user.id);
		},
		characterLogs: (user, { count }, _) => {
			return character.getLogsByUserId(user.id, count);
		}
	},
	TodoList: {
		user: (todoList) => user.get(todoList.user_id),
		todoItems: (todoList) => item.getItems(todoList.id),
	},
	Team: {
		members: ({ id }) => team.getUsersByTeamId(id),
		teamType: ({ id }) => teamType.getByTeamId(id),
		spaces: ({ id, level, gauge }) => spaceItem.getAllSpaceItemsByTeam({ teamId: id, level, gauge }),
		gauge: ({ level, gauge }) => gaugeModel.get({ level, gauge })
	},
};

module.exports = resolvers;

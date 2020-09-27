const { insertUser, selectUser, autheticate } = require('../model/user')

const resolvers = {
    Query: {
	    login: (_, { email, password }) => selectUser(email, password),
	    isLogin: (_, { authorization }) => autheticate(authorization),
    },
    Mutation: {
        signup: (_, { email, name, password }) => insertUser(email, name, password)
    }
};

module.exports = resolvers;

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config/.env') });

const sequelize = require('./db/models/index').sequelize;
const { GraphQLServer } = require('graphql-yoga');
const express = require('express');

const resolvers = require('./src/graphql/resolvers');

const options = {
	port: 3000,
	endpoint: '/graphql',
	subscriptions: '/subscriptions',
	playground: '/playground',
};

sequelize.sync();
const server = new GraphQLServer({
	typeDefs: './src/graphql/schema.graphql',
	resolvers,
});


server.use(express.static(path.join(__dirname, 'public')));

server.start(options, ({ port }) => console.log(`Server is running on :${port}`));

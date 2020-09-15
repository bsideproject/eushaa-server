require('dotenv').config({ path: path.join(__dirname, 'config/.env') })

const sequelize = require('./db/models/index').sequelize;
const { GraphQLServer } = require('graphql-yoga');

const user = require("./src/model/user")

const typeDefs = `
  type Mutation  {
    signup(email: String! ,name: String!, password: String!): User
  }
  type User {
    email: String!,
    name: String!,
    password: String!
  }
`;
const resolvers = {
    Query: {

    },
    Mutation: {
        signup: (_, { email, name, password }) => user.insertUser(email, name, password)
    }
};

sequelize.sync();
const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));
//include express module or package
const express = require('express');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const db = require('./db');
const models = require('./models');
const jwt = require('jsonwebtoken');

const port = process.env.PORT;

//GraphQL
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

//Create express app
const app = express();

// get user info from JWT
const getUser = (token) => {
  if (token) {
    try {
      // return the user information from the token
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // if there's a problem with the token, throw an error
      throw new Error('Session invalid');
    }
  }
};

//Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization;
    // try to retrieve user with token
    const user = getUser(token);
    // log the user to the console:
    console.log(user);
    // add the db models and the user to the context
    return { models, user };
  },
});

//Apollo GraphQL middleware - set path to /api
server.applyMiddleware({ app, path: '/api' });
app.get('/', (req, res) => res.send('Hello World'));

const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;
const DB_URL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;
db.connect(DB_URL);

app.listen({ port }, () =>
  console.log(`Server running at http://localhost:${port}`)
);

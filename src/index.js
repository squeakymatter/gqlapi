//include express module or package
const express = require('express');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const db = require('./db');

const port = process.env.PORT;

//GraphQL
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

//Create express app
const app = express();
//Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
//Apply  Apollo GraphQL middleware and set path to /api
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

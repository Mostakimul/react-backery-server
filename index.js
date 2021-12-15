const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { MONGODB } = require('./config');

// typeDefs
const typeDefs = require('./graphql/typeDefs');
// resolvers
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

// connect to database
mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`🚀  Server ready at ${res.url}`);
  })
  .catch((err) => {
    console.log(err);
  });

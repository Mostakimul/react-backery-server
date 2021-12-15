const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const { MONGODB } = require('./config');

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
};

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

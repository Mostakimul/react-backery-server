const productsResolvers = require('./products');
const categoriesResolvers = require('./categoris');
const userResolvers = require('./users');

module.exports = {
  Query: {
    ...categoriesResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};

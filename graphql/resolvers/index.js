const productsResolvers = require('./products');
const categoriesResolvers = require('./categoris');
const userResolvers = require('./users');

module.exports = {
  Query: {
    ...categoriesResolvers.Query,
    ...productsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...categoriesResolvers.Mutation,
    ...productsResolvers.Mutation,
  },
};

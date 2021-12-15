const productsResolvers = require('./products');
const categoriesResolvers = require('./categoris');

module.exports = {
  Query: {
    ...categoriesResolvers.Query,
  },
};

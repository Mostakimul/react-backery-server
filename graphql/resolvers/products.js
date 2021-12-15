// models
const Products = require('../../models/Products');

module.exports = {
  Query: {
    getProducts: async () => {
      try {
        return await Products.find();
      } catch (error) {
        console.log(error);
      }
    },
  },
};

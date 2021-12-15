// models
const Categories = require('../../models/Categories');

module.exports = {
  Query: {
    getCategories: async () => {
      try {
        return await Categories.find();
      } catch (error) {
        console.log(error);
      }
    },
  },
};

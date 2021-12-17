// models
const Categories = require('../../models/Categories');
const checkAuth = require('../../util/checkAuth');
const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query: {
    // fetch all categoris
    getCategories: async () => {
      try {
        return await Categories.find();
      } catch (error) {
        console.log(error);
      }
    },
    // fetch single category
    getCategory: async (_, { catId }) => {
      try {
        const category = await Categories.findById(catId);
        if (category) {
          return category;
        } else {
          throw new Error('Category not found!');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    // create a category
    async createCategory(_, { body }, context) {
      const user = checkAuth(context);

      try {
        if (user.email !== 'admin@gmail.com') {
          throw new AuthenticationError('You do not have permission!');
        } else {
          const newCategory = new Categories({
            categoryName: body,
            createdAt: new Date().toISOString(),
          });

          const category = await newCategory.save();

          return category;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    // delete a category
    async deleteCategory(_, { catId }, context) {
      const user = checkAuth(context);

      try {
        if (user.email !== 'admin@gmail.com') {
          throw new AuthenticationError('You do not have permission!');
        } else {
          const category = await Categories.findById(catId);
          await category.delete();
          return 'Category deleted successfully!';
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

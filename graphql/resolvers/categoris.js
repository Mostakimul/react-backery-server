// models
const Categories = require('../../models/Categories');
const checkAuth = require('../../util/checkAuth');

module.exports = {
  Query: {
    getCategories: async () => {
      try {
        return await Categories.find();
      } catch (error) {
        console.log(error);
      }
    },
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
    async createCategory(_, { body }, context) {
      const user = checkAuth(context);

      try {
        if (user.email !== 'admin@gmail.com') {
          throw new Error('You do not have permission!');
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
  },
};

// models
const Products = require('../../models/Products');
const checkAuth = require('../../util/checkAuth');
const { AuthenticationError } = require('apollo-server');

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
  Mutation: {
    // adding a product
    async addProduct(
      _,
      { productInput: { productName, price, image, description, quantity, category } },
      context,
    ) {
      // check if user is authenticated
      const user = checkAuth(context);

      try {
        if (user.email !== 'admin@gmail.com') {
          throw new AuthenticationError('You do not have permission!');
        } else {
          const newProduct = new Products({
            productName,
            price,
            image,
            description,
            isAvailable: true,
            quantity,
            category,
            createdAt: new Date().toISOString(),
          });

          const product = await newProduct.save();

          return product;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

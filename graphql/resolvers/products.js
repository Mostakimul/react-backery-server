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
        throw new Error(error);
      }
    },
    // fetching single product
    getProduct: async (_, { prodId }) => {
      try {
        console.log(prodId);
        const product = await Products.findById(prodId);
        console.log(product);
        if (product) {
          return product;
        } else {
          throw new Error('Product not found!');
        }
      } catch (error) {
        throw new Error(error);
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

const { gql } = require('apollo-server');

module.exports = gql`
  # category type
  type Category {
    id: ID!
    categoryName: String!
    createdAt: String!
  }

  # product type
  type Product {
    id: ID!
    productName: String!
    price: Float!
    image: String!
    description: String!
    isAvailable: Boolean!
    quantity: Int!
    category: String!
    createdAt: String!
  }

  # user type
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    isAdmin: Boolean
    createdAt: String!
  }

  # for user register
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  # product input field
  input ProductInput {
    productName: String!
    price: Float!
    image: String!
    description: String!
    quantity: Int!
    category: String!
  }

  # all queries
  type Query {
    getCategories: [Category]
    getCategory(catId: ID!): Category
    getProducts: [Product]
    getProduct(prodId: ID!): Product
  }

  # all mutation
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createCategory(body: String!): Category!
    deleteCategory(catId: ID!): String!
    addProduct(productInput: ProductInput): Product!
    deleteProduct(prodId: ID!): String!
  }
`;

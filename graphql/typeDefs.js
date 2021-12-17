const { gql } = require('apollo-server');

module.exports = gql`
  type Category {
    id: ID!
    categoryName: String!
    createdAt: String!
  }
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

  type Query {
    getCategories: [Category]
    getCategory(catId: ID!): Category
  }

  # user registration mutation
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createCategory(body: String!): Category!
    deleteCategory(catId: ID!): String!
    addProduct(productInput: ProductInput): Product!
  }
`;

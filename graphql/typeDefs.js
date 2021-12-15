const { gql } = require('apollo-server');

module.exports = gql`
  type Category {
    id: ID!
    categoryName: String!
    createdAt: String!
  }

  type Query {
    getCategories: [Category]
  }
`;

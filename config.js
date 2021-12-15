const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  MONGODB: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sandbox.5jrgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
};

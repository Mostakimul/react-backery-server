const { model, Schema } = require('mongoose');

const categoriesSchema = new Schema({
  categoryName: String,
  createdAt: String,
});

module.exports = model('Categories', categoriesSchema);

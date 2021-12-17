const { model, Schema, SchemaTypes } = require('mongoose');

const productsSchema = new Schema({
  productName: String,
  price: Number,
  image: String,
  description: String,
  isAvailable: Boolean,
  quantity: Number,
  category: String,
  createdAt: String,
});

module.exports = model('Products', productsSchema);

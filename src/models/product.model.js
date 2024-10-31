const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const ProductsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
ProductsSchema.plugin(toJSON);
ProductsSchema.plugin(paginate);
/**
 * @typedef Products
 */
const Products = mongoose.model('Products', ProductsSchema);

module.exports = Products;

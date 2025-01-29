const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import UUID for generating unique SKUs
const { toJSON, paginate } = require('./plugins');

const sizeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "S", "M", "L"
  image: { type: String },
  quantityPrice: [
    {
      quantity: { type: Number, required: true }, // Quantity for the size
      price: { type: Number, required: true }, // Price for the specific quantity
    },
  ],
});

const styleSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, // Style name, e.g., "Casual", "Formal"
  image: { type: String },
  sizes: [sizeSchema], // Array of sizes with prices for each style
});

const optionsSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., "versions", "proofOptions", etc.
  cards: [
    {
      title: { type: String }, // Title for each card
      image: { type: String }, // Image URL for each card
    },
  ],
});

const descriptionSchema = new mongoose.Schema({
  descriptionTitle: { type: String },
  text: { type: String },
  images: [{ type: String }],
  styles: [styleSchema], // Array of styles with size and price options
  options: [optionsSchema], // Unified array to hold all dynamic options
  comments: { type: String },
});
const productDescription = new mongoose.Schema({
  title: { type: String, trim: true },
  image: { type: String },
  descriptions: { type: String },
});

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    sku: { type: String, unique: true, trim: true }, // SKU (Stock Keeping Unit)
    image: { type: String, required: true },
    descriptions: [descriptionSchema], // Array of descriptions with styles and other options
    productDescription: [productDescription],
  },
  {
    timestamps: true,
  }
);
productSchema.pre('save', function (next) {
  if (!this.sku) {
    this.sku = `SKU-${uuidv4().split('-')[0].toUpperCase()}`; // Generate a unique SKU
  }
  next();
});
// Plugins for JSON conversion and pagination
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

const mongoose = require('mongoose');
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
  basePrice: { type: Number, required: true }, // Base price for the style
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

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    descriptions: [descriptionSchema], // Array of descriptions with styles and other options
  },
  {
    timestamps: true,
  }
);

// Plugins for JSON conversion and pagination
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

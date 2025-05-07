const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

// FAQ Sub-Schema
const faqSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
});

// Main SEO Schema
const productSeoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true }, // Title for SEO
    description: { type: String, required: true }, // Meta description
    script: { type: String }, // Script for custom meta tags or tracking
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    faqs: [faqSchema],
    // Google Shopping Data
    googleShopping: {
      gtin: { type: String, trim: true }, // Global Trade Item Number
      mpn: { type: String, trim: true }, // Manufacturer Part Number
      brand: { type: String, trim: true },
      condition: { type: String, enum: ['new', 'used', 'refurbished'], default: 'new' },
      availability: { type: String, enum: ['in stock', 'out of stock', 'pre-order'], default: 'in stock' },
      price: { type: Number, required: true },
      currency: { type: String, default: 'USD' },
      googleCategory: { type: String, trim: true }, // Google Product Category ID
    },
  },
  { timestamps: true }
);

// Plugins for JSON conversion and pagination
productSeoSchema.plugin(toJSON);
productSeoSchema.plugin(paginate);

/**
 * @typedef SEO
 */
const ProductSeo = mongoose.model('ProductSeo', productSeoSchema);

module.exports = ProductSeo;

const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const seoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true }, // Title for SEO
    description: { type: String, required: true }, // Meta description
    keywords: { type: [String], required: true }, // Array of keywords
    script: { type: String }, // Script for custom meta tags or tracking
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

// Plugins for JSON conversion and pagination
seoSchema.plugin(toJSON);
seoSchema.plugin(paginate);

/**
 * @typedef SEO
 */
const Seo = mongoose.model('Seo', seoSchema);

module.exports = Seo;

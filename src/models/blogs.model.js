const mongoose = require('mongoose');
const { toJSON } = require('./plugins'); // Assuming you have a custom plugin for converting to JSON

// Define Description Schema
const titledescriptionsSchema = new mongoose.Schema({
  descriptionTitle: {
    type: String,
    required: true, // Ensure that descriptionTitle is required
  },
  text: {
    type: String,
    required: true, // Ensure that text is required
  },
  image: {
    type: String,
  },
});

// Define Blog Schema
const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // String to store image URLs or paths
      required: false, // Set to true if images are mandatory
      default: '', // Optional: default empty string if no image is provided
    },
    titledescriptions: {
      type: [titledescriptionsSchema], // Array of descriptions with styles and other options
      required: false, // This field can be optional, modify it if needed
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Add plugin that converts mongoose to JSON (like your GetQuote schema)
BlogSchema.plugin(toJSON);

/**
 * @typedef Blog
 */
const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;

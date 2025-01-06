const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const NewsletterSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugin that converts mongoose to JSON
NewsletterSchema.plugin(toJSON);

/**
 * @typedef Newsletter
 */
const Newsletter = mongoose.model('Newsletter', NewsletterSchema);

module.exports = Newsletter;

const mongoose = require('mongoose');
const toJSON = require('./plugins/toJSON.plugin'); // Path adjust karein

const DesignQuoteSchema = mongoose.Schema(
  {
    user: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
        name: { type: String, required: true }, // User's name
        email: { type: String, required: true }, // User's email
        phonenumber: { type: Number, required: true }, // User's phone number
      },
    ],
    productName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    turnaround: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Includes createdAt and updatedAt
  }
);

// Add plugin that converts mongoose to JSON
DesignQuoteSchema.plugin(toJSON);

/**
 * @typedef DesignQuote
 */
const DesignQuote = mongoose.model('DesignQuote', DesignQuoteSchema);

module.exports = DesignQuote;

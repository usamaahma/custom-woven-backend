const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const GetQuoteSchema = mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
    },
    artwork: {
      type: Array,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugin that converts mongoose to JSON
GetQuoteSchema.plugin(toJSON);

/**
 * @typedef Products
 */
const GetQuote = mongoose.model('GetQuote', GetQuoteSchema);

module.exports = GetQuote;

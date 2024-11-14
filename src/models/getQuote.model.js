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
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
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
    comments: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
GetQuoteSchema.plugin(toJSON);
/**
 * @typedef Products
 */
const GetQuote = mongoose.model('GetQuote', GetQuoteSchema);

module.exports = GetQuote;

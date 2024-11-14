const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const ProductDescriptionSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Reference to the Products model
      required: true, // Make it required if every product description should be linked to a product
    },
    artworkFile: {
      type: String,
    },
    size: {
      type: String,
    },
    style: {
      type: String,
    },
    versions: {
      type: String,
    },
    proofOptions: {
      type: String,
    },
    turnaroundOptions: {
      type: String,
    },
    backingOptions: {
      type: String,
    },
    metallicThreads: {
      type: String,
    },
    satinMaterialColor: {
      type: String,
    },
    printColors: {
      type: String,
    },
    cottonMaterialColor: {
      type: String,
    },
    pricing: [
      {
        quantity: {
          type: Number,
        },
        unitPrice: {
          type: Number,
        },
        total: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add plugin that converts mongoose to JSON
ProductDescriptionSchema.plugin(toJSON);
ProductDescriptionSchema.plugin(paginate);

/**
 * @typedef ProductDescription
 */
const ProductDescription = mongoose.model('ProductDescription', ProductDescriptionSchema);

module.exports = ProductDescription;

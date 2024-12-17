const mongoose = require('mongoose'); // Mongoose import for MongoDB
const { toJSON } = require('./plugins'); // Custom plugin to convert mongoose documents to JSON

// Define options schema
const optionsSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title for each card (required)
});

// Define the main PendingCheckout schema
const PendingCheckoutSchema = new mongoose.Schema(
  {
    user: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
        name: { type: String, required: true }, // User's name
        email: { type: String, required: true }, // User's email
        phonenumber: { type: Number, required: true }, // User's phone number
      },
    ],
    pendingCheckout: [
      {
        productName: { type: String, required: true }, // Product name added to checkout
        artwork: { type: String, required: true }, // URL or path to artwork
        options: [optionsSchema], // Options as an array of objects
        size: { type: String, required: true }, // Size of the product
        style: { type: String, required: true }, // Style of the product
        quantityPrice: [
          {
            quantity: { type: Number, required: true }, // Quantity of the size
            price: { type: Number, required: true }, // Price for that quantity
          },
        ],
        comments: { type: String }, // Optional comments (not required)
      },
    ],
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Add plugin that converts mongoose documents to JSON
PendingCheckoutSchema.plugin(toJSON);

// Define the PendingCheckout model
const PendingCheckout = mongoose.model('PendingCheckout', PendingCheckoutSchema);

// Export the PendingCheckout model
module.exports = {
  PendingCheckout,
};

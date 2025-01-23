const mongoose = require('mongoose');

// Schema for Completed Order
const completedOrderSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true, // item name is required
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, // item id is required and should be an ObjectId
      ref: 'Item', // Assuming there's an 'Item' model for reference
    },
    price: {
      type: Number,
      required: true, // price is required
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

module.exports = mongoose.model('CompletedOrder', completedOrderSchema);

const { CompletedOrder } = require('../models');
const CompletedOrderService = require('../services/completedOrder.service'); // Import the service

// Controller to create a completed order
const createCompletedOrder = async (req, res) => {
  try {
    const { itemName, itemId, price, userId } = req.body;
    const newOrder = await CompletedOrderService.createCompletedOrder({ itemName, itemId, price, userId });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get all completed orders for a user
const getCompletedOrders = async (req, res) => {
  try {
    const { userId } = req.query; // Optional filtering by userId
    const filter = userId ? { userId } : {}; // Apply filter if userId exists
    const total = await CompletedOrder.countDocuments(filter); // Count total documents
    const orders = await CompletedOrder.find(filter).lean(); // Fetch all completed orders

    res.status(200).send({
      total, // Total count of orders
      orders, // List of all orders
    });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Controller to get a specific completed order by orderId
const getCompletedOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await CompletedOrderService.getCompletedOrdersByUserId(orderId);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller to update a completed order by orderId
const updateCompletedOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedData = req.body;
    const updatedOrder = await CompletedOrderService.updateCompletedOrderById(orderId, updatedData);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to delete a completed order by orderId
const deleteCompletedOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    await CompletedOrderService.deleteCompletedOrderById(orderId);
    res.status(204).json(); // No Content
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createCompletedOrder,
  getCompletedOrders,
  getCompletedOrder,
  updateCompletedOrder,
  deleteCompletedOrder,
};

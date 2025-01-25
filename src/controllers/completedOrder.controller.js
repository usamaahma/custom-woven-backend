const CompletedOrderService = require('../services/completedOrder.service'); // Import the service

// Controller to create a completed order
const createCompletedOrder = async (req, res) => {
  try {
    const { itemName, itemId, price, user, billingAddress, shippingAddress, checkoutProducts, payment } = req.body;

    // Ensure that user details are provided correctly
    if (!user || !user.id || !user.name || !user.email || !user.phoneNumber) {
      return res.status(400).json({ message: 'User details are incomplete.' });
    }

    const newOrder = await CompletedOrderService.createCompletedOrder({
      itemName,
      itemId,
      price,
      user,
      billingAddress,
      shippingAddress,
      checkoutProducts,
      payment,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getAllCompletedProducts = async (req, res) => {
  try {
    const completedOrders = await CompletedOrderService.fetchAllCompletedOrders();
    res.status(200).json({
      success: true,
      message: 'Fetched all completed orders successfully.',
      data: completedOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching completed orders.',
    });
  }
};
// Controller to get all completed orders for a user
const getCompletedOrders = async (req, res) => {
  try {
    const { userId } = req.query; // Optional filtering by userId

    if (!userId) {
      return res.status(400).send({ message: 'User ID is required' });
    }

    const orders = await CompletedOrderService.getCompletedOrdersByUserId(userId);

    res.status(200).send({
      orders,
    });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};
// Controller to get a specific completed order by orderId
const getCompletedOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await CompletedOrderService.getCompletedOrderById(orderId); // Correct service method
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller to update a completed order by orderId
const updateCompletedOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedData = req.body; // Updated data from the body
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
  getAllCompletedProducts,
};

const AccountAddressService = require('../services/accountAddress.service'); // Import the service

// Controller to create an account address
const createAccountAddress = async (req, res) => {
  try {
    const { userId, shippingAddress, billingAddress } = req.body;
    const newAddress = await AccountAddressService.createAccountAddress({ userId, shippingAddress, billingAddress });
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get all account addresses for a user
const getAccountAddresses = async (req, res) => {
  try {
    const { userId } = req.query;
    const addresses = await AccountAddressService.getAccountAddresses(userId);
    res.status(200).json(addresses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get a specific account address
const getAccountAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const address = await AccountAddressService.getAccountAddress(addressId);
    res.status(200).json(address);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller to update an account address
const updateAccountAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const updatedData = req.body;
    const updatedAddress = await AccountAddressService.updateAccountAddress(addressId, updatedData);
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to delete an account address
const deleteAccountAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    await AccountAddressService.deleteAccountAddress(addressId);
    res.status(204).json(); // No Content
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createAccountAddress,
  getAccountAddresses,
  getAccountAddress,
  updateAccountAddress,
  deleteAccountAddress,
};

const AccountAddress = require('../models/accountAddress.model'); // Assuming the model is named appropriately
const { objectId } = require('../validations/custom.validation'); // Assuming custom objectId validation exists

// Create Account Address
const createAccountAddress = async (data) => {
  try {
    const address = await AccountAddress.create(data);
    return address;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get All Account Addresses for a User
const getAccountAddresses = async (userId) => {
  try {
    const addresses = await AccountAddress.find({ userId: objectId(userId) });
    return addresses;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get Single Account Address
const getAccountAddress = async (addressId) => {
  try {
    const address = await AccountAddress.findById(objectId(addressId));
    if (!address) throw new Error('Address not found');
    return address;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update Account Address
const updateAccountAddress = async (addressId, data) => {
  try {
    const address = await AccountAddress.findByIdAndUpdate(objectId(addressId), data, {
      new: true,
    });
    if (!address) throw new Error('Address not found');
    return address;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete Account Address
const deleteAccountAddress = async (addressId) => {
  try {
    const address = await AccountAddress.findByIdAndDelete(objectId(addressId));
    if (!address) throw new Error('Address not found');
    return address;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createAccountAddress,
  getAccountAddresses,
  getAccountAddress,
  updateAccountAddress,
  deleteAccountAddress,
};

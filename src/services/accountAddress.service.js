const httpStatus = require('http-status');
const AccountAddress = require('../models/accountAddress.model'); // Correct model path
const ApiError = require('../utils/ApiError');

/**
 * Create an account address
 * @param {Object} addressBody
 * @returns {Promise<AccountAddress>}
 */
const createAccountAddress = async (addressBody) => {
  try {
    const accountAddress = new AccountAddress(addressBody);
    await accountAddress.save();
    return accountAddress;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Error creating address: ${error.message}`);
  }
};
/**
 * Query for account addresses by userId
 * @param {ObjectId} userId
 * @returns {Promise<AccountAddress[]>}
 */
const getAccountAddressesByUserId = async (userId) => {
  const addresses = await AccountAddress.find({ userId });
  return addresses;
};

/**
 * Update an account address by addressId
 * @param {ObjectId} addressId
 * @param {Object} updateBody
 * @returns {Promise<AccountAddress>}
 */
const updateAccountAddressById = async (addressId, updateBody) => {
  const address = await AccountAddress.findById(addressId);
  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }
  Object.assign(address, updateBody);
  await address.save();
  return address;
};

/**
 * Delete an account address by addressId
 * @param {ObjectId} addressId
 * @returns {Promise<AccountAddress>}
 */
const deleteAccountAddressById = async (addressId) => {
  const address = await AccountAddress.findById(addressId);
  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }
  await address.remove();
  return address;
};

module.exports = {
  createAccountAddress,
  getAccountAddressesByUserId,
  updateAccountAddressById,
  deleteAccountAddressById,
};

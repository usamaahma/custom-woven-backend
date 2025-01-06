const httpStatus = require('http-status');
const { AccountAddress } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an account address
 * @param {Object} addressBody
 * @returns {Promise<AccountAddress>}
 */
const createAccountAddress = async (addressBody) => {
  return AccountAddress.create(addressBody);
};

/**
 * Query for account addresses by userId
 * @param {ObjectId} userId
 * @returns {Promise<AccountAddress[]>}
 */
const getAccountAddressesByUserId = async (userId) => {
  const addresses = await AccountAddress.find({ userId });
  if (!addresses || addresses.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No addresses found for this user');
  }
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

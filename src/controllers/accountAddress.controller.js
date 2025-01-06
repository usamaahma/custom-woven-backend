const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { accountAddressService } = require('../services');

const createAccountAddress = catchAsync(async (req, res) => {
  const accountAddress = await accountAddressService.createAccountAddress(req.body);
  res.status(httpStatus.CREATED).send(accountAddress);
});

const getAccountAddressById = catchAsync(async (req, res) => {
  const accountAddress = await accountAddressService.getAccountAddressesByUserId(req.params.addressId);
  if (!accountAddress) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Account address not found');
  }
  res.send(accountAddress);
});

const updateAccountAddressById = catchAsync(async (req, res) => {
  const accountAddress = await accountAddressService.updateAccountAddressById(req.params.addressId, req.body);
  res.send(accountAddress);
});

const deleteAccountAddressById = catchAsync(async (req, res) => {
  await accountAddressService.deleteAccountAddressById(req.params.addressId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAccountAddress,
  getAccountAddressById,
  updateAccountAddressById,
  deleteAccountAddressById,
};

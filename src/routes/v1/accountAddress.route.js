const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const accountAddressValidation = require('../../validations/accountAddress.validation');
const accountAddressController = require('../../controllers/accountAddress.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(accountAddressValidation.createAccountAddress), accountAddressController.createAccountAddress)
  .get(validate(accountAddressValidation.getAccountAddressByUserId), accountAddressController.getAccountAddressById);

router
  .route('/:addressId')
  .patch(
    auth('manageAccountAddress'),
    validate(accountAddressValidation.updateAccountAddress),
    accountAddressController.updateAccountAddressById
  )
  .delete(
    auth('manageAccountAddress'),
    validate(accountAddressValidation.deleteAccountAddress),
    accountAddressController.deleteAccountAddressById
  );

module.exports = router;

const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const accountAddressValidation = require('../../validations/accountAddress.validation');
const accountAddressController = require('../../controllers/accountAddress.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(accountAddressValidation.createAccountAddress), accountAddressController.createAccountAddress)
  .get(validate(accountAddressValidation.getAccountAddresses), accountAddressController.getAccountAddresses);

router
  .route('/:addressId')
  .get(
    auth('getAccountAddress'),
    validate(accountAddressValidation.getAccountAddress),
    accountAddressController.getAccountAddress
  )
  .patch(
    auth('manageAccountAddress'),
    validate(accountAddressValidation.updateAccountAddress),
    accountAddressController.updateAccountAddress
  )
  .delete(
    auth('manageAccountAddress'),
    validate(accountAddressValidation.deleteAccountAddress),
    accountAddressController.deleteAccountAddress
  );

module.exports = router;

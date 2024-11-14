const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const ProductDescriptionValidation = require('../../validations/orderDescription.validation');
const ProductDescriptionController = require('../../controllers/orderDescription.controller');

const router = express.Router();

router
  .route('/')
  .post(
    validate(ProductDescriptionValidation.createProductDescription),
    ProductDescriptionController.createProductDescription
  )
  .get(validate(ProductDescriptionValidation.getProductDescriptions), ProductDescriptionController.getProductDescriptions);

router
  .route('/:productDescriptionId')
  .get(validate(ProductDescriptionValidation.getProductDescription), ProductDescriptionController.getProductDescription)
  .patch(
    auth('updateProductDescription'), // Authorization middleware for update
    validate(ProductDescriptionValidation.updateProductDescription),
    ProductDescriptionController.updateProductDescription
  )
  .delete(
    auth('deleteProductDescription'), // Authorization middleware for delete
    validate(ProductDescriptionValidation.deleteProductDescription),
    ProductDescriptionController.deleteProductDescription
  );

module.exports = router;

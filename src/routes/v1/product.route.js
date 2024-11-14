const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const ProductsValidation = require('../../validations/product.validation');
const ProductsController = require('../../controllers/product.controller');

const router = express.Router();

// Route for creating and getting products
router
  .route('/')
  .post(validate(ProductsValidation.createProduct), ProductsController.createProduct)
  .get(validate(ProductsValidation.getProducts), ProductsController.getProducts);

// Route for getting products by category (or other filters)
router.route('/byCategory').get(validate(ProductsValidation.getProducts), ProductsController.getProductsByCategories);

// Routes for handling single product (get, update, delete)
router
  .route('/:productId')
  .get(validate(ProductsValidation.getProduct), ProductsController.getProduct)
  .patch(auth('products'), validate(ProductsValidation.updateProduct), ProductsController.updateProduct)
  .delete(auth('products'), validate(ProductsValidation.deleteProduct), ProductsController.deleteProduct);

module.exports = router;

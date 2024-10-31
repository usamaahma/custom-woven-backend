const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const ProductsValidation = require('../../validations/product.validation');
const ProductsController = require('../../controllers/product.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(ProductsValidation.createProduct), ProductsController.createProducts)
  .get(validate(ProductsValidation.getProducts), ProductsController.getProducts);
router.route('/byCategory').get(validate(ProductsValidation.getProducts), ProductsController.getProductsByCategories);

router
  .route('/:productId')
  .get(validate(ProductsValidation.getProducts), ProductsController.getProduct)
  .patch(auth('products'), validate(ProductsValidation.updateProduct), ProductsController.updateProduct)
  .delete(auth('products'), validate(ProductsValidation.deleteProduct), ProductsController.deleteProduct);

module.exports = router;

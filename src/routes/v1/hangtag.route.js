const express = require('express');
const validate = require('../../middlewares/validate');
const hangtagController = require('../../controllers/hangtag.controller');
const hangtagValidation = require('../../validations/hangtag.validation');

const router = express.Router();

router
  .route('/')
  .post(validate(hangtagValidation.createHangtag), hangtagController.createHangtag)
  .get(hangtagController.getHangtags);

router
  .route('/:id')
  .get(validate(hangtagValidation.getHangtag), hangtagController.getHangtag)
  .patch(validate(hangtagValidation.updateHangtag), hangtagController.updateHangtag)
  .delete(validate(hangtagValidation.deleteHangtag), hangtagController.deleteHangtag);

module.exports = router;

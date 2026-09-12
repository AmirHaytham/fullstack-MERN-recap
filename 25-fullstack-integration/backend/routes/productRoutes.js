const express = require('express');
const router = express.Router();
const c = require('../controllers/productController');

router.route('/').get(c.getProducts).post(c.createProduct);
router.route('/:id').get(c.getProduct).delete(c.deleteProduct);
router.patch('/:id/toggle', c.toggleStock);

module.exports = router;

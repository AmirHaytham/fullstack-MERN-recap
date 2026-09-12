const express = require('express');
const router = express.Router();
const c = require('../controllers/userController');

router.route('/').get(c.getUsers).post(c.createUser);
router.route('/:id').get(c.getUser).delete(c.deleteUser);

module.exports = router;

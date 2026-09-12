// A Router instance is a complete middleware and routing system,
// which is why it is often called a "mini-app".

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('All users'));
router.post('/', (req, res) => res.send('Create user'));

// notice: the path here is "/:id", NOT "/users/:id".
// The "/users" prefix is added once in server.js
router.get('/:id', (req, res) => res.send(`One user: ${req.params.id}`));
router.delete('/:id', (req, res) => res.send(`Delete user ${req.params.id}`));

module.exports = router;

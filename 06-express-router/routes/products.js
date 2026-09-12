// A second router, to show that the prefix is what keeps them apart.

const express = require('express');
const router = express.Router();

// middleware that only runs for /products/* -> the "mini-app" idea
router.use((req, res, next) => {
  console.log(`[products router] ${req.method} ${req.originalUrl}`);
  next();
});

router.get('/', (req, res) => res.send('All products'));
router.get('/:id', (req, res) => res.send(`One product: ${req.params.id}`));

module.exports = router;

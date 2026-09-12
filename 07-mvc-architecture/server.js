//   VIEW  --sends input-->  CONTROLLER  --manipulates-->  MODEL
//    ^                                                       |
//    +---------------------- updates -----------------------+

const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// serve the VIEW
app.use(express.static(path.join(__dirname, 'views')));

// mount the CONTROLLER through the routes
app.use('/api/users', userRoutes);

const PORT = 3007;
app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
  console.log('  View        -> views/index.html');
  console.log('  Controller  -> controllers/userController.js');
  console.log('  Model       -> models/User.js');
});

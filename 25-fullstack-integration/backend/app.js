// Builds the Express app: middleware, CORS and routes.
// Kept separate from server.js so the app can be imported by tests
// without opening a port.

const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// CORS: "don't forget CORS handling"
// The frontend runs on http://localhost:5125 and the backend on
// http://localhost:4000. Different port = different origin, so the browser
// blocks the request unless the server explicitly allows it.
app.use(cors({ origin: 'http://localhost:5125' }));
// During development many people just write app.use(cors()) to allow everyone.
// In production you name the real origins.

app.use(express.json());

// log every request, so the class can see the frontend hitting the backend
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) =>
  res.send('SP1 backend is running. Try /api/users or /api/products')
);

app.use((req, res) => res.status(404).json({ error: 'No route matched' }));

module.exports = app;

const express = require('express');
const app = express();

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

// Every route inside routes/users.js now lives under /users
app.use('/users', userRoutes);

// Every route inside routes/products.js now lives under /products
app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.send(`
    <h2>Express Router demo</h2>
    <p>Two routers, two prefixes, one server.</p>
    <ul>
      <li><a href="/users">/users</a></li>
      <li><a href="/users/7">/users/7</a></li>
      <li><a href="/products">/products</a></li>
      <li><a href="/products/7">/products/7</a> (watch the terminal for the router middleware log)</li>
    </ul>`);
});

const PORT = 3006;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

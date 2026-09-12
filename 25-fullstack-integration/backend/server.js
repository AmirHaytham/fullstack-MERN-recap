// Opens the port. Nothing else lives here.
const app = require('./app');

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log('  GET    /api/users');
  console.log('  POST   /api/users');
  console.log('  GET    /api/products');
  console.log('  GET    /api/products?inStock=true');
  console.log('  PATCH  /api/products/:id/toggle');
});

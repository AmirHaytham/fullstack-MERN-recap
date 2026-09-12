// The products controller. Business logic lives here.
const Product = require('../models/Product');

exports.getProducts = (req, res) => {
  // req.query.inStock comes from  GET /api/products?inStock=true
  res.json(Product.findAll({ inStock: req.query.inStock }));
};

exports.getProduct = (req, res) => {
  const product = Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
};

exports.createProduct = (req, res) => {
  const { title, price } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  if (price === undefined || Number(price) < 0) {
    return res.status(400).json({ error: 'price must be 0 or more' });
  }
  res.status(201).json(Product.create({ title, price: Number(price) }));
};

exports.toggleStock = (req, res) => {
  const product = Product.toggleStock(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
};

exports.deleteProduct = (req, res) => {
  if (!Product.remove(req.params.id)) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.status(204).send();
};

// Products, stored in memory.

let products = [
  { id: 1, title: 'Laptop stand', price: 320, inStock: true },
  { id: 2, title: 'Mechanical keyboard', price: 1450, inStock: true },
  { id: 3, title: 'USB-C hub', price: 640, inStock: false },
];
let nextId = 4;

module.exports = {
  findAll: ({ inStock } = {}) => {
    // filtering by a QUERY PARAM, which is exactly what PA1 asks for
    if (inStock === undefined) return products;
    const want = inStock === 'true';
    return products.filter((p) => p.inStock === want);
  },
  findById: (id) => products.find((p) => p.id === Number(id)),
  create: (data) => {
    const product = { id: nextId++, inStock: true, ...data };
    products.push(product);
    return product;
  },
  toggleStock: (id) => {
    const product = products.find((p) => p.id === Number(id));
    if (!product) return null;
    product.inStock = !product.inStock;
    return product;
  },
  remove: (id) => {
    const before = products.length;
    products = products.filter((p) => p.id !== Number(id));
    return products.length < before;
  },
};

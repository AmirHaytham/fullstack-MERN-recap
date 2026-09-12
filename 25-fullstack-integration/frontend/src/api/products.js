import api from './client';

// filter is 'all' | 'in' | 'out'
export const fetchProducts = (filter = 'all') => {
  const params = {};
  if (filter === 'in') params.inStock = true;
  if (filter === 'out') params.inStock = false;
  // axios turns params into the query string: /products?inStock=true
  return api.get('/products', { params }).then((res) => res.data);
};

export const createProduct = (data) => api.post('/products', data).then((res) => res.data);
export const toggleStock = (id) => api.patch(`/products/${id}/toggle`).then((res) => res.data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

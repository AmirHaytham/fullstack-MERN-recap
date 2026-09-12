// The component the slide names in the project tree.
// It owns the filter state, and refetches from the SERVER whenever it changes.
// That is server-side filtering through a query param, which is exactly what
// Practice Assignment 1 asks for.

import React, { useState, useEffect } from 'react';
import { fetchProducts, createProduct, toggleStock, deleteProduct } from '../api/products';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  // refetch whenever the filter changes -> [filter] in the dependency array
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts(filter);
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) setError(describe(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };   // cleanup: ignore a response that arrives late
  }, [filter]);

  const reload = async () => setProducts(await fetchProducts(filter));

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await createProduct({ title, price });
      setTitle('');
      setPrice('');
      reload();
    } catch (err) {
      setError(describe(err));
    }
  };

  const handleToggle = async (id) => {
    await toggleStock(id);
    reload();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    reload();
  };

  return (
    <div className="card">
      <h2>Products</h2>

      <div>
        <button className={filter === 'all' ? '' : 'ghost'} onClick={() => setFilter('all')}>
          All
        </button>
        <button className={filter === 'in' ? '' : 'ghost'} onClick={() => setFilter('in')}>
          In stock
        </button>
        <button className={filter === 'out' ? '' : 'ghost'} onClick={() => setFilter('out')}>
          Out of stock
        </button>
      </div>

      <p className="note">
        Request sent: <code>GET /api/products{filter === 'all' ? '' : `?inStock=${filter === 'in'}`}</code>
      </p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: '#b00' }}>{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr><th>Product</th><th>Price</th><th>Stock</th><th></th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.price} EGP</td>
                <td>{p.inStock ? 'in stock' : 'out of stock'}</td>
                <td>
                  <button className="ghost" onClick={() => handleToggle(p.id)}>toggle</button>
                  <button className="ghost" onClick={() => handleDelete(p.id)}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && !error && products.length === 0 && (
        <p className="note">Nothing matches this filter.</p>
      )}

      <h3>Add a product</h3>
      <form onSubmit={handleAdd}>
        <input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="price" size="6" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <p className="note">
        Submit with an empty title, or a negative price. The message comes from
        the <strong>controller</strong> on the backend, not from this component.
      </p>
    </div>
  );
}

function describe(err) {
  if (err.response) return `${err.response.status}: ${err.response.data.error || 'request failed'}`;
  return `${err.message}. Is the backend running on port 4000?`;
}

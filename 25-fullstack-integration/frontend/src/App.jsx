//   Backend  runs in its own terminal:   npm start     -> http://localhost:4000
//   Frontend runs in its own terminal:   npm run dev   -> http://localhost:5125
//   We use axios to call the backend endpoints.
//   Don't forget CORS handling.

import React, { useState } from 'react';
import Home from './components/Home.jsx';
import ProductList from './components/ProductList.jsx';

export default function App() {
  const [tab, setTab] = useState('products');

  return (
    <div>
      <h1>Integration of BE and FE via MVC</h1>
      <p className="slide">Slide: Integration of BE and FE via MVC (page 034)</p>

      <div className="card">
        <h2>Two processes, two terminals</h2>
        <table>
          <thead>
            <tr><th></th><th>Command</th><th>Address</th></tr>
          </thead>
          <tbody>
            <tr><td>Backend</td><td><code>npm start</code> in <code>backend/</code></td><td>http://localhost:4000</td></tr>
            <tr><td>Frontend</td><td><code>npm run dev</code> in <code>frontend/</code></td><td>http://localhost:5125</td></tr>
          </tbody>
        </table>
        <p className="note">
          Different ports means different origins, which is why the backend has
          to send CORS headers. Watch the backend terminal while you click
          around: every request from this page shows up there.
        </p>
      </div>

      <nav>
        <button className={tab === 'products' ? '' : 'ghost'} onClick={() => setTab('products')}>
          Products
        </button>
        <button className={tab === 'users' ? '' : 'ghost'} onClick={() => setTab('users')}>
          Users
        </button>
      </nav>

      {tab === 'products' ? <ProductList /> : <Home />}

      <div className="card">
        <h2>Where every piece lives</h2>
        <pre>{`Browser click
  -> ProductList.jsx          the VIEW
  -> api/products.js          axios, the only place that knows HTTP
  -> GET /api/products?inStock=true
  -> routes/productRoutes.js  maps the verb + path
  -> productController.js     the CONTROLLER, business logic
  -> models/Product.js        the MODEL, pure data
  -> JSON back up the same path`}</pre>
      </div>
    </div>
  );
}

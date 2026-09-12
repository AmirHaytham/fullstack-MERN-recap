// The other component the slide names in the project tree.
// Same pattern as ProductList, on a simpler resource.

import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, deleteUser } from '../api/users';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setUsers(await fetchUsers());
      } catch (err) {
        setError(describe(err));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);          // [] -> once, on mount

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await createUser({ name, email });
      setName('');
      setEmail('');
      setUsers(await fetchUsers());
    } catch (err) {
      setError(describe(err));
    }
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(await fetchUsers());
  };

  return (
    <div className="card">
      <h2>Users</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: '#b00' }}>{error}</p>}
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email}){' '}
            <button className="ghost" onClick={() => handleDelete(u.id)}>delete</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAdd}>
        <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Add user</button>
      </form>
    </div>
  );
}

function describe(err) {
  if (err.response) return `${err.response.status}: ${err.response.data.error || 'request failed'}`;
  return `${err.message}. Is the backend running on port 4000?`;
}

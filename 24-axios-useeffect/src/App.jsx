//   useEffect(..., [])          runs once when the component mounts
//   fetchData()                 async function declared to fetch data
//   axios.get(...)              sends a GET request
//   await                       waits for the response before continuing
//   setUser(response.data)      updates state with the fetched data
//   catch (error)               catches and logs any request error
//   fetchData()                 invokes the async function immediately

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:3024';

export default function App() {
  return (
    <div>
      <h1>Axios with useEffect</h1>
      <p className="slide">Slide: Axios / Axios with UseEffect() (pages 032-033)</p>

      <div className="card">
        <h2>Before you demo</h2>
        <p>
          This page talks to a small API on <code>http://localhost:3024</code>.
          Start it in a <strong>second terminal</strong> with{' '}
          <code>npm run api</code>, exactly like the slide says the backend runs
          in its own terminal.
        </p>
      </div>

      <UserList />
      <SingleUser />
      <WhyNotFetch />
    </div>
  );
}

// the slide's pattern, on a list
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API}/users`);
        console.log('response', response);
        setUsers(response.data);       // axios already parsed the JSON for us
      } catch (err) {
        console.log('error');
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();                        // invoke the async function immediately
  }, []);                               // [] -> run once, when the component mounts

  return (
    <div className="card">
      <h2>1. Fetch a list on mount</h2>
      {loading && <p>Loading...</p>}
      {error && (
        <p style={{ color: '#b00' }}>
          {error}. Is the API running? Try <code>npm run api</code>.
        </p>
      )}
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
      <p className="note">
        Three states, always: loading, error, data. Students who skip the first
        two get a blank page and no idea why.
      </p>
    </div>
  );
}

// refetching when a value changes
function SingleUser() {
  const [id, setId] = useState(1);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setError(null);
        // the slide uses localhost:3000/users/ + the id; 3024 here to free up 3000
        const response = await axios.get(`${API}/users/${id}`);
        setUser(response.data);
      } catch (err) {
        setUser(null);
        setError(err.response?.status === 404 ? 'No user with that id' : err.message);
      }
    }
    fetchData();
  }, [id]);                             // [id] -> refetch whenever id changes

  return (
    <div className="card">
      <h2>2. Refetch when the dependency changes</h2>
      <button className="ghost" onClick={() => setId(1)}>id 1</button>
      <button className="ghost" onClick={() => setId(2)}>id 2</button>
      <button className="ghost" onClick={() => setId(3)}>id 3</button>
      <button className="ghost" onClick={() => setId(99)}>id 99 (404)</button>
      {error && <p style={{ color: '#b00' }}>{error}</p>}
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
      <p className="note">
        The dependency array is <code>[id]</code>, so every click triggers a new
        request. Watch the Network tab.
      </p>
    </div>
  );
}

// why axios and not fetch
function WhyNotFetch() {
  return (
    <div className="card">
      <h2>3. Why axios instead of fetch()</h2>
      <table>
        <thead>
          <tr><th></th><th>fetch()</th><th>axios</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>parsing JSON</td>
            <td><code>await res.json()</code></td>
            <td>automatic, <code>response.data</code></td>
          </tr>
          <tr>
            <td>a 404 response</td>
            <td>resolves, you must check <code>res.ok</code></td>
            <td>throws, so <code>catch</code> actually catches it</td>
          </tr>
          <tr>
            <td>base URL and headers</td>
            <td>repeat them every call</td>
            <td><code>axios.create({'{ baseURL }'})</code> once</td>
          </tr>
        </tbody>
      </table>
      <p className="note">
        Install with <code>npm install axios</code>, import with{' '}
        <code>import axios from 'axios'</code>.
      </p>
    </div>
  );
}

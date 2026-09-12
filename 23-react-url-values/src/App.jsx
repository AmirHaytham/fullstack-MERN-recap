// Route Params      : dynamic values in the PATH.   /users/42  ->  id = 42
// URL Search Params : query values.                 ?q=react
// Location Object   : the full picture: pathname, search, state

import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useSearchParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';

const USERS = [
  { id: 1, name: 'Menna', tab: 'info' },
  { id: 2, name: 'Hassan', tab: 'info' },
  { id: 42, name: 'Rahma', tab: 'info' },
];

// 1. Route params
function UserProfile() {
  const { id } = useParams();          // URL /users/42 makes id = "42"
  const user = USERS.find((u) => u.id === Number(id));

  return (
    <div className="card">
      <h2>1. Route params</h2>
      <pre>{`<Route path="/users/:id" element={<UserProfile />} />
const { id } = useParams();     // -> "${id}"`}</pre>
      <p>{user ? `This is ${user.name}.` : 'No such user, but the route matched.'}</p>
      <SearchBox />
      <LocationBox />
    </div>
  );
}

// 2. URL search params
function SearchBox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';
  const tab = searchParams.get('tab') || 'info';

  return (
    <>
      <h2>2. URL search params</h2>
      <pre>{`const [searchParams, setSearchParams] = useSearchParams();
const keyword = searchParams.get("q");   // -> ${JSON.stringify(keyword)}
setSearchParams({ q: "react" });`}</pre>

      <input
        placeholder="search..."
        value={keyword}
        onChange={(e) => setSearchParams({ q: e.target.value, tab })}
      />
      <button onClick={() => setSearchParams({ q: 'react', tab })}>
        setSearchParams({'{ q: "react" }'})
      </button>
      <button className="ghost" onClick={() => setSearchParams({ q: keyword, tab: 'info' })}>
        tab=info
      </button>
      <button className="ghost" onClick={() => setSearchParams({ q: keyword, tab: 'grades' })}>
        tab=grades
      </button>

      <p>
        Reading back: q = <code>{keyword || '(empty)'}</code>, tab ={' '}
        <code>{tab}</code>
      </p>
      <p className="note">
        Type in the box and watch the address bar. The URL <em>is</em> the state.
        Copy the URL into a new tab and the search comes with it.
      </p>
    </>
  );
}

// 3. Location object
function LocationBox() {
  const location = useLocation();
  return (
    <>
      <h2>3. Location object</h2>
      <pre>{`const location = useLocation();
location.pathname -> ${JSON.stringify(location.pathname)}
location.search   -> ${JSON.stringify(location.search)}
location.state    -> ${JSON.stringify(location.state)}`}</pre>
      <p className="note">
        <code>location.state</code> is whatever was passed through{' '}
        <code>navigate(path, {'{ state: ... }'})</code>. It is not part of the URL.
      </p>
    </>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <div className="card">
      <h2>Pick a user</h2>
      <ul>
        {USERS.map((u) => (
          <li key={u.id}>
            <Link to={`/users/${u.id}?q=react&tab=info`}>
              /users/{u.id}?q=react&amp;tab=info
            </Link>
          </li>
        ))}
      </ul>
      <button
        onClick={() => navigate('/users/42?tab=grades', { state: { from: 'the home page' } })}
      >
        navigate with state, so location.state is not null
      </button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <h1>URL values</h1>
      <p className="slide">Slide: URL Values (page 031)</p>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/users/42?q=react&tab=info">/users/42?q=react&amp;tab=info</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>

      <div className="card">
        <h2>Which one do I use?</h2>
        <table>
          <thead>
            <tr><th>Need</th><th>Tool</th><th>Looks like</th></tr>
          </thead>
          <tbody>
            <tr><td>identify a resource</td><td><code>useParams</code></td><td>/users/<strong>42</strong></td></tr>
            <tr><td>filter, search, paginate</td><td><code>useSearchParams</code></td><td>?q=react&amp;page=2</td></tr>
            <tr><td>pass data between pages</td><td><code>useLocation().state</code></td><td>invisible, lost on refresh</td></tr>
          </tbody>
        </table>
      </div>
    </BrowserRouter>
  );
}

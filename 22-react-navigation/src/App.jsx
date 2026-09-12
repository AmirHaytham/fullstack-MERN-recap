// <Link>         declarative clickable link, replaces <a> to avoid a full reload
// <NavLink>      like Link, but knows whether its route is currently active
// useNavigate()  programmatic navigation from JavaScript, e.g. after a form submit

import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from 'react-router-dom';

function Home() {
  return (
    <div className="card">
      <h2>Home</h2>
      <p>Use the three navigation styles above and watch the URL.</p>
    </div>
  );
}

function Profile() {
  return <div className="card"><h2>Profile</h2><p>NavLink marked this tab as active.</p></div>;
}

function Dashboard() {
  const location = useLocation();
  return (
    <div className="card">
      <h2>Dashboard</h2>
      <p>
        Data passed through navigate():{' '}
        <strong>{location.state?.data ?? 'nothing was passed'}</strong>
      </p>
      <p className="note">
        Read it with <code>useLocation().state</code>. It does not appear in the
        URL, so a refresh loses it.
      </p>
    </div>
  );
}

// useNavigate: redirect after a form submission
function Login() {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.trim()) return;
    // the second argument can carry state along with the navigation
    navigate('/dashboard', { state: { data: `hello ${user}` } });
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
      <p className="note">
        A link cannot do this. The redirect has to happen after the submit
        handler runs, which is exactly what <code>useNavigate()</code> is for.
      </p>
    </div>
  );
}

function NavButtons() {
  const navigate = useNavigate();
  return (
    <div className="card">
      <h2>3. useNavigate(), navigating from JavaScript</h2>
      <button onClick={() => navigate('/profile')}>navigate("/profile")</button>
      <button className="ghost" onClick={() => navigate(-1)}>navigate(-1) go back</button>
      <button className="ghost" onClick={() => navigate(1)}>navigate(1) go forward</button>
      <button
        className="ghost"
        onClick={() => navigate('/dashboard', { state: { data: 'hello world' } })}
      >
        navigate with state
      </button>
    </div>
  );
}

function CurrentUrl() {
  const location = useLocation();
  return <p className="note">URL: <code>{location.pathname}</code></p>;
}

export default function App() {
  return (
    <BrowserRouter>
      <h1>Link, NavLink, useNavigate</h1>
      <p className="slide">Slide: Navigation (page 030)</p>

      <div className="card">
        <h2>1. &lt;Link&gt;, a plain clickable link</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
        </nav>
        <p className="note">
          Replaces <code>&lt;a&gt;</code> so the page never reloads. Try a real{' '}
          <a href="/profile">plain &lt;a&gt; tag</a> and watch the tab spinner:
          that is a full reload, and the whole React app restarts.
        </p>
      </div>

      <div className="card">
        <h2>2. &lt;NavLink&gt;, knows when it is active</h2>
        <nav>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
            Profile
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
            Login
          </NavLink>
        </nav>
        <p className="note">
          The active tab is underlined. <code>end</code> on the Home link stops it
          from matching every URL, because every path starts with "/".
        </p>
      </div>

      <NavButtons />
      <CurrentUrl />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

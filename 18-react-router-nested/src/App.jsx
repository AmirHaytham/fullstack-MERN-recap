// Normal Route : render a component for a specific path
// Nested Route : sub-routes inside a parent route. The child content changes
//                but the parent stays on screen. That is "partial rendering".
//
// <Outlet /> is the placeholder where the child route gets injected.

import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';

function Home() {
  return <div className="card"><h2>Home</h2><p>A normal route.</p></div>;
}

function About() {
  return <div className="card"><h2>About</h2><p>Another normal route.</p></div>;
}

// Dashboard.jsx from the slide
function Dashboard() {
  return (
    <div className="card" style={{ border: '2px dashed #1f7ac0' }}>
      <h2>Dashboard (the PARENT)</h2>
      <p className="note">
        Everything inside this dashed box belongs to the parent. It does not
        re-mount when you switch tabs below.
      </p>
      <nav>
        <Link to="stats">Stats</Link>
        <Link to="settings">Settings</Link>
      </nav>

      <div style={{ background: '#f2f8fd', padding: 12, borderRadius: 8, marginTop: 12 }}>
        {/* This is where <Stats /> or <Settings /> will be injected */}
        <Outlet />
      </div>
    </div>
  );
}

function Stats() {
  return (
    <>
      <h3>Stats (a CHILD)</h3>
      <p>Enrolled students: 312</p>
    </>
  );
}

function Settings() {
  return (
    <>
      <h3>Settings (a CHILD)</h3>
      <p>Notifications: on</p>
    </>
  );
}

function NoTabChosen() {
  return <p className="note">Pick a tab above. Only the inner box will change.</p>;
}

function CurrentUrl() {
  const location = useLocation();
  return <p className="note">URL: <code>{location.pathname}</code></p>;
}

export default function App() {
  return (
    <BrowserRouter>
      <h1>Normal and nested routes</h1>
      <p className="slide">Slide: Routing, Normal Route / Nested Route (page 026)</p>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <CurrentUrl />

      <Routes>
        {/* normal routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* nested routes: the parent renders, the child fills its <Outlet /> */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<NoTabChosen />} />
          <Route path="stats" element={<Stats />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      <div className="card">
        <h2>The code</h2>
        <pre>{`<Route path="/dashboard" element={<Dashboard />}>
  <Route path="stats"    element={<Stats />} />
  <Route path="settings" element={<Settings />} />
</Route>

// Dashboard.jsx
<nav>
  <Link to="stats">Stats</Link>
  <Link to="settings">Settings</Link>
</nav>
<Outlet />   {/* <Stats /> or <Settings /> gets injected here */}`}</pre>
        <p className="note">
          The child paths are written <code>"stats"</code>, not{' '}
          <code>"/dashboard/stats"</code>. A leading slash would make the path
          absolute and break the nesting.
        </p>
      </div>
    </BrowserRouter>
  );
}

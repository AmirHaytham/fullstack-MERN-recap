// An index route specifies the DEFAULT child inside a parent layout.
// It has no `path`, only the word `index`. It matches the parent's own URL.
//
//   /dashboard            -> DashboardHome   (the index route)
//   /dashboard/stats      -> Stats

import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';

function Layout() {
  return (
    <div style={{ border: '2px dashed #1f7ac0', borderRadius: 10, padding: 14 }}>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <div style={{ marginTop: 12 }}>
        <Outlet />
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="card">
      <h2>Home</h2>
      <p>
        This is the <strong>index route</strong> of the root layout. The URL is
        just "/", with nothing after it.
      </p>
    </div>
  );
}

function About() {
  return <div className="card"><h2>About</h2></div>;
}

function Dashboard() {
  return (
    <div className="card" style={{ border: '2px dotted #5a7a93' }}>
      <h2>Dashboard layout</h2>
      <nav>
        <Link to="/dashboard">Overview</Link>
        <Link to="/dashboard/stats">Stats</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
      <div style={{ background: '#f2f8fd', padding: 12, borderRadius: 8, marginTop: 12 }}>
        <Outlet />
      </div>
    </div>
  );
}

function DashboardHome() {
  return (
    <>
      <h3>Overview</h3>
      <p>
        This is the dashboard's <strong>index route</strong>. It renders at
        <code> /dashboard </code> with no extra segment.
      </p>
      <p className="note">
        Without it, /dashboard would render the layout and an empty Outlet.
      </p>
    </>
  );
}

function Stats()    { return <><h3>Stats</h3><p>312 students.</p></>; }
function Settings() { return <><h3>Settings</h3><p>Notifications: on.</p></>; }

function CurrentUrl() {
  const location = useLocation();
  return <p className="note">URL: <code>{location.pathname}</code></p>;
}

export default function App() {
  return (
    <BrowserRouter>
      <h1>Index routes</h1>
      <p className="slide">Slide: Routing, Index Routes (page 028)</p>
      <CurrentUrl />

      <Routes>
        <Route path="/" element={<Layout />}>
          {/* index: the default page for "/" */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          <Route path="dashboard" element={<Dashboard />}>
            {/* index: the default page for "/dashboard" */}
            <Route index element={<DashboardHome />} />
            <Route path="stats" element={<Stats />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>

      <div className="card">
        <h2>The code</h2>
        <pre>{`<Route path="/" element={<Layout />}>
  <Route index          element={<Home />} />
  <Route path="about"   element={<About />} />
</Route>`}</pre>
        <p className="note">
          An index route has <strong>no path</strong>. Writing{' '}
          <code>path=""</code> instead of <code>index</code> works too, but
          <code>index</code> says what you mean.
        </p>
      </div>
    </BrowserRouter>
  );
}

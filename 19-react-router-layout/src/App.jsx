// A layout route = nested routes + <Outlet />.
// It defines a shared layout (navbar, sidebar, footer) that wraps many pages,
// so you do not repeat the same structure in every component.

import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '10px 14px', background: '#fff', borderRadius: 8, border: '1px solid #cfe3f2' }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/login">Login (outside the layout)</Link>
    </nav>
  );
}

function Footer() {
  return (
    <p className="note" style={{ marginTop: 18, textAlign: 'center' }}>
      Software Project I, Winter 2026, German International University
    </p>
  );
}

// The Layout component from the slide
function Layout() {
  return (
    <div style={{ border: '2px dashed #1f7ac0', borderRadius: 10, padding: 14 }}>
      <Navbar />
      <div style={{ padding: '14px 4px' }}>
        {/* every child route renders here */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function Home()    { return <div className="card"><h2>Home</h2><p>Written once, wrapped automatically.</p></div>; }
function About()   { return <div className="card"><h2>About</h2><p>No navbar code in this component.</p></div>; }
function Contact() { return <div className="card"><h2>Contact</h2><p>No footer code either.</p></div>; }

// A page deliberately OUTSIDE the layout, to prove the layout is opt-in
function Login() {
  return (
    <div className="card">
      <h2>Login</h2>
      <p>
        This route is not a child of the layout, so it has no navbar and no
        footer. That is usually exactly what you want for a login screen.
      </p>
      <Link to="/">Back to the app</Link>
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
      <h1>Layout routes</h1>
      <p className="slide">Slide: Routing, Layout Routes (page 027)</p>
      <CurrentUrl />

      <Routes>
        {/* Layout route: the parent supplies the shared UI */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* not a child of Layout -> no navbar, no footer */}
        <Route path="/login" element={<Login />} />
      </Routes>

      <div className="card">
        <h2>The code</h2>
        <pre>{`function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

<Route path="/" element={<Layout />}>
  <Route index          element={<Home />} />
  <Route path="about"   element={<About />} />
</Route>`}</pre>
      </div>
    </BrowserRouter>
  );
}

//   BrowserRouter : wraps the entire app, enables routing
//     Routes      : a container for all Route components
//       Route     : a path + the component (element) to render when the URL matches
//
// This is how an SPA navigates without reloading the page.

import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

function Home() {
  return (
    <div className="card">
      <h2>Home</h2>
      <p>This is the component rendered for path "/".</p>
    </div>
  );
}

function About() {
  return (
    <div className="card">
      <h2>About</h2>
      <p>This is the component rendered for path "/about".</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="card">
      <h2>Contact</h2>
      <p>sp1@giu-uni.de</p>
    </div>
  );
}

// Nothing matched -> a catch-all route using the * wildcard
function NotFound() {
  return (
    <div className="card">
      <h2>404</h2>
      <p>No Route matched this URL.</p>
    </div>
  );
}

function CurrentUrl() {
  const location = useLocation();
  return (
    <p className="note">
      The URL right now is <code>{location.pathname}</code>. Notice the browser
      never showed a loading spinner: the page was never reloaded.
    </p>
  );
}

export default function App() {
  return (
    // BrowserRouter wraps the entire app
    <BrowserRouter>
      <h1>Routing hierarchy</h1>
      <p className="slide">Slide: Routing, Routing Hierarchy (page 023)</p>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/does-not-exist">A broken link</Link>
      </nav>

      <CurrentUrl />

      {/* Routes is the container. Only ONE Route inside it renders at a time. */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <div className="card">
        <h2>The hierarchy in code</h2>
        <pre>{`<BrowserRouter>
  <Routes>
    <Route path="/"      element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>`}</pre>
      </div>
    </BrowserRouter>
  );
}

// JSX = JavaScript XML. It lets us write HTML inside JavaScript.
// The compiler turns it into JavaScript function calls at runtime.

import DemoComponent from './DemoComponent.jsx';
import DemoClassComponent from './DemoClassComponent.jsx';

export default function App() {
  // Any JavaScript expression can go inside { } in JSX
  const courseName = 'Software Project I';
  const staff = ['Rahma', 'Menna', 'Hassan', 'Moamen', 'Amr', 'Amir'];
  const isWinter = true;

  return (
    <div>
      <h1>React: JSX &amp; Components</h1>
      <p className="slide">Slide: React (page 015)</p>

      <div className="card">
        <h2>1. JSX puts HTML inside JavaScript</h2>
        {/* this is how you write a comment inside JSX */}
        <p>
          Course: <strong>{courseName}</strong>, term:{' '}
          {isWinter ? 'Winter 2026' : 'Summer 2026'}
        </p>
        <p className="note">
          Note it is <code>className</code>, not <code>class</code>, because
          <code>class</code> is a reserved word in JavaScript.
        </p>
      </div>

      <div className="card">
        <h2>2. Rendering a list</h2>
        {/* the high order array functions from example 02 show up here */}
        <ul>
          {staff.map((name) => (
            <li key={name}>TA. {name}</li>
          ))}
        </ul>
        <p className="note">
          Every item in a list needs a unique <code>key</code>, otherwise React
          warns in the console.
        </p>
      </div>

      <div className="card">
        <h2>3. A function component (the modern way)</h2>
        <DemoComponent />
      </div>

      <div className="card">
        <h2>4. A class component (older syntax, still on the slide)</h2>
        <DemoClassComponent />
      </div>

      <div className="card">
        <h2>5. The rules JSX enforces</h2>
        <ul>
          <li>A component must return exactly ONE parent element.</li>
          <li>
            Every tag must be closed, including <code>&lt;br /&gt;</code> and{' '}
            <code>&lt;img /&gt;</code>.
          </li>
          <li>
            A component name must start with a Capital letter, otherwise React
            treats it as a plain HTML tag.
          </li>
        </ul>
      </div>
    </div>
  );
}

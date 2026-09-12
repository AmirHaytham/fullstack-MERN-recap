// useState takes an initial value and returns two things:
//   1) the state itself
//   2) a function that updates the state AND triggers a re-render

import React, { useState } from 'react';

export default function App() {
  // The exact example from the slide:
  const [click, setClick] = useState(0);
  // using array destructuring here
  // to assign initial value 0
  // to click and a reference to the function
  // that updates click to setClick

  // One useState per piece of state. "It is only used to declare one variable."
  const [name, setName] = useState('Menna');
  const [isOn, setIsOn] = useState(false);
  const [items, setItems] = useState(['SP1']);

  return (
    <div>
      <h1>useState</h1>
      <p className="slide">Slide: React Hooks, useState (pages 019-020)</p>

      <div className="card">
        <h2>1. The slide's counter</h2>
        <p>You clicked {click} times</p>
        <button onClick={() => setClick(click + 1)}>Click me</button>
        <button className="ghost" onClick={() => setClick(0)}>Reset</button>
      </div>

      <div className="card">
        <h2>2. A plain variable does NOT work</h2>
        <BrokenCounter />
      </div>

      <div className="card">
        <h2>3. One hook per piece of state</h2>
        <p>
          Name: <strong>{name}</strong>
        </p>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <p className="note">
          A controlled input: the value comes from state, and every keystroke
          calls the setter.
        </p>
      </div>

      <div className="card">
        <h2>4. Booleans and conditional rendering</h2>
        <button onClick={() => setIsOn(!isOn)}>
          Turn {isOn ? 'off' : 'on'}
        </button>
        {isOn && <p>The lamp is ON.</p>}
      </div>

      <div className="card">
        <h2>5. Arrays and objects: never mutate, always replace</h2>
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <button onClick={() => setItems([...items, 'Course ' + (items.length + 1)])}>
          Correct: setItems([...items, newItem])
        </button>
        <button
          className="ghost"
          onClick={() => {
            items.push('pushed');   // mutates the SAME array
            setItems(items);        // React sees the same reference -> no re-render
          }}
        >
          Wrong: items.push(...)
        </button>
        <p className="note">
          The second button changes the array but the screen does not update.
          React compares the reference, and the reference did not change.
        </p>
      </div>

      <div className="card">
        <h2>What happens on every click</h2>
        <ol>
          <li>You call <code>setClick(...)</code>.</li>
          <li>React marks the component as "dirty": something has changed.</li>
          <li>React schedules a re-render of that component.</li>
          <li>
            React recalculates the UI, diffs the old and new Virtual DOM, and
            updates only the real DOM nodes that actually changed.
          </li>
        </ol>
      </div>
    </div>
  );
}

// A counter written with a normal variable, to prove why useState is needed.
function BrokenCounter() {
  let count = 0;                       // this resets on every render

  const increase = () => {
    count = count + 1;
    console.log('the variable is now', count, 'but the screen will not update');
  };

  return (
    <div>
      <p>Broken count: {count}</p>
      <button className="ghost" onClick={increase}>
        Click me (open the console)
      </button>
      <p className="note">
        The variable really does increase, look at the console. But nothing
        tells React to re-render, so the screen is frozen at 0.
      </p>
    </div>
  );
}

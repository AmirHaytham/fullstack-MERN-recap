// Parent Component, exactly as on the slide.
//
// The state lives in the PARENT. The child gets the value AND the function
// that changes it. This is how a child "talks back" to its parent.

import React, { useState } from 'react';
import ChildComponent from './ChildComponent.jsx';
import CounterChild from './CounterChild.jsx';

export default function App() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  // a handler that receives data FROM the child
  const handleAdd = (amount) => setCount((prev) => prev + amount);

  return (
    <div>
      <h1>Passing methods as props</h1>
      <p className="slide">Slide: ReactJs props, Passing Methods (pages 017-018)</p>

      <div className="card">
        <h2>1. The slide's example</h2>
        <p className="note">
          Parent owns <code>count</code> and <code>incrementCount</code>. The
          child gets both and only calls them.
        </p>
        <ChildComponent count={count} increment={incrementCount} />
      </div>

      <div className="card">
        <h2>2. A child that sends data back up</h2>
        <p className="note">
          The child calls <code>onAdd(5)</code>. The parent decides what to do
          with that 5.
        </p>
        <CounterChild label="Change the same count:" onAdd={handleAdd} />
      </div>

      <div className="card">
        <h2>3. One state, two children, always in sync</h2>
        <p>
          Shared count: <strong>{count}</strong>
        </p>
        <button className="ghost" onClick={() => setCount(0)}>Reset from the parent</button>
        <p className="note">
          Both children read the same number because there is only one copy of
          it, and it lives in the parent. This is called "lifting state up".
        </p>
      </div>
    </div>
  );
}

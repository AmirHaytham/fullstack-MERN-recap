//   Situation                        What to use       Example
//   You set a new fixed value        Direct update     setName("Sara")
//   You calculate on the old value   Callback update   setCount(prev => prev + 1)
//
// Why? React BATCHES updates for performance. Your variable might be stale.
// The callback always gives you the fresh, correct previous state.

import React, { useState } from 'react';

export default function App() {
  const [direct, setDirect] = useState(0);
  const [callback, setCallback] = useState(0);
  const [name, setName] = useState('Menna');
  const [log, setLog] = useState([]);

  // THE BUG: three calls in a row, all reading the same stale `direct`
  const addThreeDirect = () => {
    setDirect(direct + 1);
    setDirect(direct + 1);
    setDirect(direct + 1);
    // all three computed 0 + 1, so the result is 1, not 3
  };

  // THE FIX: each call receives the value produced by the previous one
  const addThreeCallback = () => {
    setCallback((prev) => prev + 1);
    setCallback((prev) => prev + 1);
    setCallback((prev) => prev + 1);
    // 0 -> 1 -> 2 -> 3
  };

  // Stale state inside an async callback: the classic bug in project code
  const delayedDirect = () => {
    const before = direct;
    setTimeout(() => {
      setDirect(before + 1);
      setLog((l) => [...l, `direct: read ${before} one second ago, wrote ${before + 1}`]);
    }, 1000);
  };

  const delayedCallback = () => {
    setTimeout(() => {
      setCallback((prev) => {
        setLog((l) => [...l, `callback: read the live value ${prev}, wrote ${prev + 1}`]);
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <div>
      <h1>setState best practice</h1>
      <p className="slide">Slide: React Hooks, setState() Best Practice (page 021)</p>

      <div className="card">
        <h2>1. Direct update: three calls, one increment</h2>
        <p>
          Value: <strong>{direct}</strong>
        </p>
        <button onClick={addThreeDirect}>Call setDirect(direct + 1) three times</button>
        <p className="note">
          Every click adds 1, not 3. All three calls read the same stale{' '}
          <code>direct</code>, because React batches them before re-rendering.
        </p>
      </div>

      <div className="card">
        <h2>2. Callback update: three calls, three increments</h2>
        <p>
          Value: <strong>{callback}</strong>
        </p>
        <button onClick={addThreeCallback}>
          Call setCallback(prev =&gt; prev + 1) three times
        </button>
        <p className="note">
          Every click adds 3. Each callback receives the value the previous one
          produced.
        </p>
      </div>

      <div className="card">
        <h2>3. The same bug, one second later</h2>
        <p className="note">
          Click a delayed button, then immediately click the fast button above it
          a few times, and watch what gets written.
        </p>
        <button className="ghost" onClick={delayedDirect}>Direct, after 1s</button>
        <button className="ghost" onClick={delayedCallback}>Callback, after 1s</button>
        <button className="ghost" onClick={() => setLog([])}>Clear log</button>
        <ul>
          {log.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>4. When direct update is perfectly fine</h2>
        <p>
          Name: <strong>{name}</strong>
        </p>
        <button onClick={() => setName('Sara')}>setName("Sara")</button>
        <button className="ghost" onClick={() => setName('Menna')}>setName("Menna")</button>
        <p className="note">
          A fixed value does not depend on the old one, so there is nothing to go
          stale.
        </p>
      </div>

      <div className="card">
        <h2>Simple Rule</h2>
        <p>
          <strong>"If you depend on the old value, always use callback."</strong>
        </p>
      </div>
    </div>
  );
}

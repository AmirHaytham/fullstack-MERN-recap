//   useEffect(<FUNCTION>, <DEPENDENCY>)
//
// Performs side effects: fetching data, updating the DOM, setting timers.
// Runs AFTER render by default.
//
// The three cases from the slide:
//   1. no dependency array  -> runs on EVERY render
//   2. empty array []       -> runs ONCE, on the first render
//   3. [props, state]       -> runs whenever one of those values changes

import React, { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [log, setLog] = useState([]);
  const [showTimer, setShowTimer] = useState(false);

  const addLog = (line) =>
    setLog((prev) => [`${new Date().toLocaleTimeString()}  ${line}`, ...prev].slice(0, 12));

  // CASE 1: no dependency array -> after every single render
  useEffect(() => {
    console.log('[case 1] every render');
  });

  // CASE 2: empty array -> once, when the component mounts
  useEffect(() => {
    addLog('[case 2] mount only, this is where you fetch data');
    document.title = 'useEffect demo';
  }, []);

  // CASE 3: with dependencies -> only when `count` changes
  useEffect(() => {
    addLog(`[case 3] count changed to ${count}`);
  }, [count]);

  // CASE 3 again, with a different dependency
  useEffect(() => {
    if (text) addLog(`[case 3] text is now "${text}"`);
  }, [text]);

  return (
    <div>
      <h1>useEffect</h1>
      <p className="slide">Slide: React Hooks, useEffect (page 022)</p>

      <div className="card">
        <h2>The three dependency cases</h2>
        <pre>{`useEffect(() => { ... })             // 1. every render
useEffect(() => { ... }, [])         // 2. once, on mount
useEffect(() => { ... }, [count])    // 3. when count changes`}</pre>
      </div>

      <div className="card">
        <h2>Trigger them</h2>
        <p>
          count: <strong>{count}</strong>
        </p>
        <button onClick={() => setCount(count + 1)}>count + 1</button>
        <input
          placeholder="type here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className="note">
          Typing changes <code>text</code> but not <code>count</code>. Only the
          effects that depend on what changed will run. Case 1 logs to the
          browser console on every keystroke.
        </p>
      </div>

      <div className="card">
        <h2>Effect log</h2>
        <ul>
          {log.map((line, i) => (
            <li key={i}>
              <code>{line}</code>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Cleanup: the part the slide does not show</h2>
        <p className="note">
          If an effect starts something (a timer, a subscription), it must return
          a function that stops it. Otherwise the timer keeps running after the
          component is gone.
        </p>
        <button onClick={() => setShowTimer(!showTimer)}>
          {showTimer ? 'Unmount the timer' : 'Mount the timer'}
        </button>
        {showTimer && <Timer />}
      </div>
    </div>
  );
}

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log('Timer mounted, starting interval');
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);

    // the cleanup function: runs when the component unmounts,
    // and before the effect runs again
    return () => {
      console.log('Timer unmounted, clearing interval');
      clearInterval(id);
    };
  }, []);

  return <p>Alive for {seconds} seconds</p>;
}

// localStorage gives us access to the browser's Storage object:
//   localStorage.setItem("key", "value")
//   localStorage.getItem("key")
//   localStorage.removeItem("key")
// Data remains even after page reload.
//
// useEffect is a perfect place to call setItem, because saving is a side effect.

import React, { useState, useEffect } from 'react';

export default function App() {
  // Read the saved value ONCE, when the state is first created.
  // The function form of useState means this only runs on the first render.
  const [name, setName] = useState(() => {
    const saved = localStorage.getItem('name');
    return saved ? JSON.parse(saved) : '';
  });

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [draft, setDraft] = useState('');

  // The slide's exact pattern: store the input in the browser storage
  useEffect(() => {
    // storing input name
    localStorage.setItem('name', JSON.stringify(name));
  }, [name]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: draft, done: false }]);
    setDraft('');
  };

  const toggle = (id) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const clearAll = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('todos');
    setName('');
    setTodos([]);
  };

  return (
    <div>
      <h1>localStorage with React Hooks</h1>
      <p className="slide">Slide: Using localStorage with React Hooks (page 023)</p>

      <div className="card">
        <h2>1. A form input that survives a reload</h2>
        <input
          placeholder="type your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>
          Hello, <strong>{name || '...'}</strong>
        </p>
        <p className="note">
          Type something, then press <code>F5</code>. It is still there.
        </p>
      </div>

      <div className="card">
        <h2>2. A list that survives a reload</h2>
        <form onSubmit={addTodo}>
          <input
            placeholder="add a todo"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {todos.map((t) => (
            <li
              key={t.id}
              onClick={() => toggle(t.id)}
              style={{
                cursor: 'pointer',
                textDecoration: t.done ? 'line-through' : 'none',
                opacity: t.done ? 0.5 : 1,
              }}
            >
              {t.text}
            </li>
          ))}
        </ul>
        {todos.length === 0 && <p className="note">No todos yet.</p>}
      </div>

      <div className="card">
        <h2>3. What is actually stored</h2>
        <pre>{`localStorage.getItem("name")  -> ${localStorage.getItem('name')}
localStorage.getItem("todos") -> ${localStorage.getItem('todos')}`}</pre>
        <button className="ghost" onClick={clearAll}>
          localStorage.removeItem(...) and reset
        </button>
      </div>

      <div className="card">
        <h2>Two things that trip students up</h2>
        <ul>
          <li>
            localStorage only stores <strong>strings</strong>. That is why every
            write goes through <code>JSON.stringify</code> and every read through{' '}
            <code>JSON.parse</code>.
          </li>
          <li>
            Read it in the <code>useState</code> initializer, not in an effect.
            Reading it in an effect makes the page flash empty for one render.
          </li>
        </ul>
      </div>
    </div>
  );
}

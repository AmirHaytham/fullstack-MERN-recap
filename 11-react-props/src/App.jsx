// props are a way to pass data from a PARENT component to its CHILD components.
// They are read-only.

import React from 'react';
import ChildComponent from './ChildComponent.jsx';
import ChildDestructured from './ChildDestructured.jsx';
import ReadOnlyChild from './ReadOnlyChild.jsx';

export default function App() {
  const name = 'John';
  const age = 30;

  return (
    <div>
      <h1>React props</h1>
      <p className="slide">Slide: ReactJs props (page 016)</p>

      <div className="card">
        <h2>1. Parent passes, child receives</h2>
        <p className="note">
          Parent: <code>&lt;ChildComponent name={'{name}'} age={'{age}'} /&gt;</code>
        </p>
        <ChildComponent name={name} age={age} />
      </div>

      <div className="card">
        <h2>2. The same child, read by destructuring</h2>
        <p className="note">
          props is a JSON, so either <code>props.name</code> or{' '}
          <code>{'{ name }'}</code> in the parameter list.
        </p>
        <ChildDestructured name="Menna" age={24} />
      </div>

      <div className="card">
        <h2>3. Props are read-only</h2>
        <ReadOnlyChild name="Hassan" />
      </div>

      <div className="card">
        <h2>4. Props can be any type, not just strings</h2>
        <ChildComponent name="Rahma" age={23} />
        <p className="note">
          Watch the quotes: <code>age="30"</code> passes the <em>string</em> "30",
          while <code>age={'{30}'}</code> passes the <em>number</em> 30.
        </p>
      </div>
    </div>
  );
}

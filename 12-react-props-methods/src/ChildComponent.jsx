// Child Component, exactly as on the slide.
//
// The child receives BOTH the value (count) and the function (increment).
// It owns neither. It only calls back up.

import React from 'react';

function ChildComponent(props) {
  return (
    <div>
      <p>Count: {props.count}</p>
      <button onClick={props.increment}>Increment</button>
    </div>
  );
}

export default ChildComponent;

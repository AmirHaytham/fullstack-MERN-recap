// "Props are read-only and cannot be modified by the child components."
// This component tries to break that rule, on purpose.

function ReadOnlyChild(props) {
  const tryToModify = () => {
    try {
      // React freezes the props object, so this throws in strict mode
      props.name = 'Changed!';
      alert('It changed to: ' + props.name);
    } catch (err) {
      alert('Cannot modify props.\n\n' + err.message);
    }
  };

  return (
    <div>
      <p>I received: <strong>{props.name}</strong></p>
      <button onClick={tryToModify}>Try to change my own prop</button>
    </div>
  );
}

export default ReadOnlyChild;

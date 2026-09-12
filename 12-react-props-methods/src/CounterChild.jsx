// A second child that sends DATA back up, not just a signal.
// The parent decided what "add" means, the child only says by how much.

function CounterChild({ label, onAdd }) {
  return (
    <div>
      <strong>{label}</strong>{' '}
      <button className="ghost" onClick={() => onAdd(1)}>+1</button>
      <button className="ghost" onClick={() => onAdd(5)}>+5</button>
      <button className="ghost" onClick={() => onAdd(-1)}>-1</button>
    </div>
  );
}

export default CounterChild;

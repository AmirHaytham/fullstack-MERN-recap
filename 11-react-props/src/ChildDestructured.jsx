// ...or with destructuring, which is what you will see in most real code.
// Same component, same props, different way of reading them.

function ChildDestructured({ name, age, faculty = 'Informatics' }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Faculty: {faculty}  <span className="note">(default value, not passed by the parent)</span></p>
    </div>
  );
}

export default ChildDestructured;

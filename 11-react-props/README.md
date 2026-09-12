# 11. props

From the props slide (page 016).

The parent and child pair from the slide, read two ways, plus a child that tries
to modify its own prop and fails.

```
src/App.jsx                the parent
src/ChildComponent.jsx     reads props with dot notation
src/ChildDestructured.jsx  same child, destructured, with a default value
src/ReadOnlyChild.jsx      tries to write to a prop
```

## Run it

```bash
npm install
```

```bash
npm run dev
```

Opens <http://localhost:5111>.

## Worth showing

Click the button in section 3. Props are frozen, and that freeze is what forces
data to flow one direction.

`age={23}` passes a number, `age="23"` passes a string. Show both, it catches
people out all term.

Finish with the question that sets up the next folder: how does the child send
anything back? With props alone, it cannot.

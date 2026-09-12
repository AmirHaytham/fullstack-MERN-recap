# 12. Passing methods as props

From the props slides (pages 017 and 018).

The parent owns `count` and `incrementCount`. The child receives both and only
calls them. A second child sends an actual value back up with `onAdd(5)`.

```
src/App.jsx             the parent, owns the state
src/ChildComponent.jsx  the child from the slide
src/CounterChild.jsx    a child that passes a value upward
```

## Run it

```bash
npm install
```

```bash
npm run dev
```

Opens <http://localhost:5112>.

## Worth showing

Click the buttons in section 2 and point at section 1 changing with them. One
copy of the state, two children, always in sync. That is lifting state up, seen
rather than defined.

Write `onClick={props.increment()}` with parentheses and watch it fire on render
and loop. Passing a function is not calling it.

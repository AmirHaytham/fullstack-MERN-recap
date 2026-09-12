# 02. Functions

From the functions slide (page 004).

Named, anonymous and arrow functions, then the high order array functions:
`forEach`, `map`, `filter`, `find`, `reduce`, `sort`, and a chained
`filter().map()` at the end.

## Run it

```bash
node index.js
```

## Worth showing

`map` always returns an array of the same length, `filter` returns fewer. People
mix these two up constantly.

`sort` mutates, which is why the example copies with `[...students]` first. Tie
that back to React never mutating state.

Point at the chained example and tell them that exact shape is what they will be
writing inside JSX in an hour.

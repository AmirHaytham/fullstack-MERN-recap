# 01. Variables and objects

From the JavaScript recap slide (page 003).

Three sections printed to the terminal: `var` vs `let` vs `const`, then the three
ways to read a property off an object, then nested destructuring and spread.

## Run it

```bash
node index.js
```

No install needed, just Node.

## Worth showing

Ask them whether `scores.push(4)` throws before you run it. Most will say yes.
`const` protects the reference, not the contents, and that one wrong guess fixes
the idea for good.

The `let counter` inside the block is a completely different variable from the
one outside it. Point at both.

`person[key]` is the only form that works when the key is decided at runtime.
That is why bracket notation exists.

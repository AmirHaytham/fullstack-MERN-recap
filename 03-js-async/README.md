# 03. Async JavaScript

From the async slide (page 004).

The same logic written three ways so you can put them side by side.

| File | What it shows |
|---|---|
| `01-callbacks.js` | callbacks, and why nesting them gets ugly fast |
| `02-promises.js` | the same thing with `.then` / `.catch` / `.finally` |
| `03-async-await.js` | the slide's `fetchData()`, hits a real API so it needs internet |
| `04-async-offline.js` | same lesson against a fake API, works with no internet |

## Run it

```bash
node 01-callbacks.js
```

```bash
node 02-promises.js
```

```bash
node 03-async-await.js
```

```bash
node 04-async-offline.js
```

## Worth showing

Run `01` and ask why the numbers print out of order before you explain anything.
Then run `02` straight after. The nesting collapses into a flat chain in front of
them and the shape does the teaching for you.

If the wifi blocks jsonplaceholder, use `04` instead of `03` and nothing is lost.

The last two lines of `04` are the payoff: two sequential awaits take 600ms,
`Promise.all` takes 300ms for the same work.

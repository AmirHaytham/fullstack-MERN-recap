# 17. Routing hierarchy

From the routing slide (page 023).

`BrowserRouter` wrapping `Routes` wrapping `Route`, in exactly that nesting, plus
a `path="*"` catch all for URLs that match nothing.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Opens <http://localhost:5117>.

## Worth showing

Open the Network tab and click between Home and About. No document request is
made. That is what single page application means, and it is why BrowserRouter
exists at all.

Type `/about` straight into the address bar. It works, because the Vite dev
server rewrites unknown paths back to `index.html`. Mention that a production
server needs the same rule or a refresh will 404. They will hit this when they
deploy.

Remove `BrowserRouter` and show the error React Router throws. The wrapper is not
decoration.

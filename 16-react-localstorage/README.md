# 16. localStorage with hooks

From the localStorage slide (page 023).

A name field and a todo list, both written to localStorage from a `useEffect`,
both read back in the `useState` initializer.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Opens <http://localhost:5116>.

## Worth showing

Type a name, add two todos, hit F5. Everything is still there. That one gesture
is the whole promise of localStorage.

Open DevTools, Application, Local Storage, and show the keys changing live as you
type. The slide suggests typing `localStorage` in the console too, worth doing so
they see the methods on the Storage prototype.

Remove `JSON.parse` from the initializer and watch `"Menna"` render with the
quotes visible. localStorage stores strings and nothing else.

Open the page in a private window to show storage is per browser profile. That is
your bridge to why real apps need a database.

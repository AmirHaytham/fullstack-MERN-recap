# 24. Axios with useEffect

From the axios slides (pages 032 and 033).

The slide's pattern, an `async function fetchData()` declared inside `useEffect`
and invoked immediately, shown on both a list and a single item. Covers the
three UI states everyone forgets: loading, error, data.

This folder ships its own tiny API so it runs with no internet and no database.

## Run it

Two terminals, the way the slides describe backend and frontend.

Terminal 1:

```bash
npm install
```

```bash
npm run api
```

Terminal 2:

```bash
npm run dev
```

Opens <http://localhost:5124>. The API sits on <http://localhost:3024>.

## Worth showing

Start the React app with the API stopped. The red error appears. Then start the
API and refresh. Seeing the failure before the success is what makes the `catch`
block feel necessary instead of ceremonial.

The API has a deliberate 600ms delay so the loading state is actually visible.

Click through the id buttons with the Network tab open. One request per click,
because the dependency array is `[id]`. Change it to `[]` and watch it stop
refetching.

Click id 99. Axios throws on a 404 so the catch runs. With `fetch()` that same
404 resolves normally and goes unnoticed. That is the argument for axios in one
click.

Comment out `cors()` in `server.js` and show the browser blocking the request.
That sets up the next folder.

## Note on ports

The slide points axios at `localhost:3000`. This uses 3024 so it can run
alongside everything else without a port fight.

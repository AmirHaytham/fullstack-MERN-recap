# 18. Normal and nested routes

From the routing slide (page 026).

Normal routes on `/` and `/about`, then a nested one where `/dashboard` renders a
parent and `/dashboard/stats` renders a child inside it through `<Outlet />`. The
parent has a dashed border so the boundary is visible from the back row.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Opens <http://localhost:5118>.

## Worth showing

Switch between Stats and Settings and point at the dashed border never
flickering. Only the inside changes. That is partial rendering.

Delete `<Outlet />` and click Stats. The URL changes, the route matches, and
nothing appears. That is the single most common nested route bug.

Change `<Link to="stats">` to `<Link to="/stats">` and watch it navigate away
from the dashboard entirely. A leading slash means absolute.

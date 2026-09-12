# 19. Layout routes

From the layout routes slide (page 027).

A navbar and footer written once and wrapped around three pages automatically,
plus a `/login` route deliberately left outside the layout.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Opens <http://localhost:5119>.

## Worth showing

The dashed border marks the layout. Click Home, About and Contact and it never
moves. Click Login and it disappears completely, which makes the point that the
layout is opt in.

Ask how many files you would edit to add one link to the navbar. One. Then ask
what it would cost if every page pasted its own navbar. That question makes the
case better than any explanation.

Say plainly that this is the same mechanism as folder 18. Layout route is a name
for a pattern, not a new API.

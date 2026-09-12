# 20. Index routes

From the index routes slide (page 028).

`<Route index>` at two levels: the default child of `/` and the default child of
`/dashboard`.

| URL | What renders |
|---|---|
| `/` | layout plus Home |
| `/about` | layout plus About |
| `/dashboard` | layout plus Dashboard plus its own index page |
| `/dashboard/stats` | layout plus Dashboard plus Stats |

## Run it

```bash
npm install
```

```bash
npm run dev
```

Opens <http://localhost:5120>.

## Worth showing

Comment out the dashboard's index route and click Dashboard. The dotted box
appears with an empty panel inside it. The index route is what fills the parent's
own URL.

Point out that it has no `path`. That is what makes it match the parent exactly
instead of a sub segment.

Ask where they would use it in the project. A dashboard's default tab, or a shop
landing page inside a `/products` layout.

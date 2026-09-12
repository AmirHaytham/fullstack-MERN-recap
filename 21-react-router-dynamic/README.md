# 21. Route prefix and dynamic routes

From the routing slide (page 029).

`path="/users/:userId"` read back with `useParams()`, two params in one URL, a
prefix route that adds a URL segment without rendering anything, and a layout
route that renders UI without changing the URL.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Opens <http://localhost:5121>.

## Worth showing

Click `/users/99`. The route matches and the component renders, it just finds no
user. Route matching and data lookup are two separate problems and students
conflate them constantly.

`useParams()` always hands back strings. Show `userId === 1` being false while
`Number(userId) === 1` is true.

Click `/projects` then open a project. The dashed box appears only on the detail
page. One click shows the prefix route and the layout route doing different jobs:
one changes the URL and renders nothing, the other renders UI and changes no URL.

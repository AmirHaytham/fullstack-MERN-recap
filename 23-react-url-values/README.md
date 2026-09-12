# 23. URL values

From the URL values slide (page 031).

| What you need | Tool | Looks like |
|---|---|---|
| identify a resource | `useParams()` | `/users/42` |
| filter, search, paginate | `useSearchParams()` | `?q=react&tab=info` |
| pass data between pages | `useLocation().state` | invisible, lost on refresh |

All three live on the same page with the values echoed back as you change them.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Opens <http://localhost:5123>.

## Worth showing

Type in the search box and keep an eye on the address bar. It updates on every
keystroke. Copy the URL into a new tab and the search comes with it. That is why
filters belong in search params and not in `useState`.

Press back after typing. Every `setSearchParams` made a history entry, so you get
undo for free.

Click the navigate with state button, then F5. `location.state` goes null while
the params and the query survive. That comparison is the decision table at the
bottom of the page.

Say this one out loud: `GET /api/todos?done=true` in the assignment is a search
param travelling from React to Express. Same skill, same day.

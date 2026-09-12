# 22. Link, NavLink and useNavigate

From the navigation slide (page 030).

| Tool | Use case |
|---|---|
| `<Link>` | navbar, footer, content links. Replaces `<a>` so the page never reloads. |
| `<NavLink>` | tabs and side menus, since it knows when its route is active |
| `useNavigate()` | redirect after a form submit, login, logout, button click |

Also covers `navigate('/dashboard', { state: {...} })` and reading it back with
`useLocation().state`.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Opens <http://localhost:5122>.

## Worth showing

Section 1 has a real `<a href>` sitting next to the Links on purpose. Click both
with the Network tab open. The anchor reloads the whole document and restarts the
React app. That contrast is the entire reason Link exists.

Remove `end` from the Home NavLink and watch it stay active on every page. Every
path starts with a slash.

Submit the login form. A Link could not have done that, because the redirect has
to wait until the handler has validated the input.

On the dashboard, press F5. The passed state is gone. Navigation state is not the
URL, which is where the next folder picks up.

# 05. Express routing

From the routing slide (page 007).

`app.get`, `app.post`, `app.put` and `app.delete` on `/users`, plus three routes
that each show where the data actually lives: `req.params`, `req.query` and
`req.body`.

## Run it

```bash
npm install
```

```bash
npm start
```

Open <http://localhost:3005>. The GET routes are clickable from that page. For
the others use curl, or open `requests.http` in VS Code with the REST Client
extension.

```bash
curl -X POST http://localhost:3005/echo -H "Content-Type: application/json" -d "{\"name\":\"Menna\"}"
```

```bash
curl -X PUT http://localhost:3005/users/42
```

```bash
curl -X DELETE http://localhost:3005/users/42
```

## Worth showing

The address bar can only send GET. That is why POST needs curl or Postman, and it
is worth saying out loud because half the class will otherwise assume their route
is broken.

Comment out `express.json()` and watch `/echo` return undefined.

Move the 404 handler above the routes and restart. Every URL 404s. Express
matches top to bottom and the order is not a detail.

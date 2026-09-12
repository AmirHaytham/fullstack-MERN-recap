# 06. Express Router

From the Express Router slide (page 008).

Two routers, `users` and `products`, each mounted under its own prefix with one
line in `server.js`. The products router carries its own middleware so you can
show that a router really is a self contained mini app.

```
server.js            mounts both routers
routes/users.js      the router from the slide
routes/products.js   a second one with its own middleware
```

## Run it

```bash
npm install
```

```bash
npm start
```

Open <http://localhost:3006>.

## Worth showing

Open `routes/users.js` on screen. The paths inside are `'/'` and `'/:id'`, not
`'/users'`. The prefix is written once in `server.js`. That is the entire point.

Hit `/products/7` and point at the terminal, then hit `/users/7` and point at
nothing happening. Middleware attached to a router only runs under that prefix.

Change `app.use('/users', ...)` to `app.use('/api/users', ...)` and every user
route moves at once.

# 25. Backend and frontend together

From the integration slide (page 034). This is the one that ties every other
folder together, and it is the closest thing here to the assignment.

## Structure

The slide's tree, built for real.

```
backend/
  controllers/   userController.js, productController.js
  models/        User.js, Product.js
  routes/        userRoutes.js, productRoutes.js
  app.js         middleware, routes, CORS
  server.js      opens the port, nothing else
frontend/
  src/api/       client.js, users.js, products.js
  src/components/  Home.jsx, ProductList.jsx
  src/App.jsx
```

The models are in memory, so nothing needs MongoDB. Swapping `models/Product.js`
for a Mongoose model from folder 09 changes nothing else in the app. Say that out
loud, it is the payoff of MVC.

## Run it

Two terminals.

Terminal 1:

```bash
cd backend
```

```bash
npm install
```

```bash
npm start
```

Terminal 2:

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

Opens <http://localhost:5125>. The backend sits on <http://localhost:4000>, which
is deliberate so this can run at the same time as folder 24.

Poking the API on its own:

```bash
curl http://localhost:4000/api/products
```

```bash
curl "http://localhost:4000/api/products?inStock=true"
```

## Worth showing

**CORS.** Comment out `app.use(cors(...))` in `backend/app.js` and restart. The
frontend goes red. Nothing is wrong with the React code and nothing is wrong with
the route, the browser is simply refusing to hand over the response. Put it back
and it works. Nobody forgets CORS after watching that once.

**Query params end to end.** Click the in stock filter with the Network tab open.
The request becomes `GET /api/products?inStock=true`. That single click travels
through the axios layer, the route, the controller's `req.query` and the model's
filter. Trace it on screen. The assignment asks for exactly this flow with
`?done=true`.

**Validation.** Add a product with an empty title. The message rendered in React
was written in the controller. The frontend only displayed it.

**Keep the backend terminal visible.** Every click logs a line. Watching two
processes talk is what makes full stack stop being a buzzword.

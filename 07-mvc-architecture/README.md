# 07. MVC

From the MVC slide (page 009).

One small app split three ways, with a page that shows both the rendered list and
the raw JSON underneath it.

| Layer | File | Job |
|---|---|---|
| Model | `models/User.js` | the data and how it is stored. No HTTP, no HTML. |
| View | `views/index.html` | shows the data. Has no idea where it came from. |
| Controller | `controllers/userController.js` | business logic and validation |
| Routes | `routes/userRoutes.js` | maps a verb and path to a controller function |

The model is in memory, so this runs without a database. Example 09 shows the
same idea backed by real MongoDB.

## Run it

```bash
npm install
```

```bash
npm start
```

Open <http://localhost:3007>.

## Worth showing

Add a user with an empty name, then one with a negative age. Both errors come out
of the controller, and it helps to say that while the error is on screen.

Then ask where a rule like "names must be at least 3 letters" belongs. If they
say controller, they have it.

Restart the server and watch the data reset. That is your way into MongoDB.

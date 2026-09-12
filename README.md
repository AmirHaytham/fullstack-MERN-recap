# MERN recap, runnable

Every example from the Tutorial 1 slide deck, one folder each, all of them
actually runnable so you can put them on screen instead of reading code off a
slide.

Each folder has its own README with the run command, the slide it came from, and
a few things worth clicking while it is up.

## What you need

Node 18 or newer. That covers everything except folders 08 and 09, which need
MongoDB and `mongosh`. Either a local server or a free Atlas cluster works.

Check Mongo before class:

```bash
mongosh --eval "db.runCommand({ping:1})"
```

Everything else uses in memory data on purpose, so a broken Mongo install never
blocks a session.

## Running everything at once

There is a launcher at the repo root that starts all 23 servers, installs any
missing dependencies first, and prints a port check when it is done.

```powershell
.\start-all.ps1
```

```powershell
.\stop-all.ps1
```

The stop script frees every port the launcher uses, so it also cleans up after a
crash or a terminal you closed by accident.

Running one example on its own is still the normal case. Open its folder and
follow its README.

## The folders

| # | Folder | Slide | Run |
|---|---|---|---|
| 01 | `01-js-variables-objects` | JavaScript recap (003) | `node index.js` |
| 02 | `02-js-functions` | Functions (004) | `node index.js` |
| 03 | `03-js-async` | Async JavaScript (004) | `node 01-callbacks.js` and the rest |
| 04 | `04-git-essentials` | Git essentials (005) | `.\demo.ps1` |
| 05 | `05-express-routing` | Routing (007) | `npm install` then `npm start` |
| 06 | `06-express-router` | Express Router (008) | `npm install` then `npm start` |
| 07 | `07-mvc-architecture` | MVC (009) | `npm install` then `npm start` |
| 08 | `08-mongodb-mongosh` | MongoDB and mongosh (012, 013) | `mongosh --file seed.mongosh.js` |
| 09 | `09-mongoose-crud` | Connecting a database (014) | `npm install` then `npm start` |
| 10 | `10-react-jsx-components` | React, JSX, components (015) | `npm install` then `npm run dev` |
| 11 | `11-react-props` | props (016) | `npm install` then `npm run dev` |
| 12 | `12-react-props-methods` | Passing methods (017, 018) | `npm install` then `npm run dev` |
| 13 | `13-react-usestate` | useState (019, 020) | `npm install` then `npm run dev` |
| 14 | `14-react-setstate-callback` | setState best practice (021) | `npm install` then `npm run dev` |
| 15 | `15-react-useeffect` | useEffect (022) | `npm install` then `npm run dev` |
| 16 | `16-react-localstorage` | localStorage with hooks (023) | `npm install` then `npm run dev` |
| 17 | `17-react-router-basics` | Routing hierarchy (023) | `npm install` then `npm run dev` |
| 18 | `18-react-router-nested` | Normal and nested routes (026) | `npm install` then `npm run dev` |
| 19 | `19-react-router-layout` | Layout routes (027) | `npm install` then `npm run dev` |
| 20 | `20-react-router-index` | Index routes (028) | `npm install` then `npm run dev` |
| 21 | `21-react-router-dynamic` | Route prefix and dynamic routes (029) | `npm install` then `npm run dev` |
| 22 | `22-react-navigation` | Navigation (030) | `npm install` then `npm run dev` |
| 23 | `23-react-url-values` | URL values (031) | `npm install` then `npm run dev` |
| 24 | `24-axios-useeffect` | Axios with useEffect (032, 033) | two terminals, see its README |
| 25 | `25-fullstack-integration` | Integrating BE and FE (034) | two terminals, see its README |

## Links

Everything below is live once the launcher has run. Copy straight into the
browser.

React examples:

```
http://localhost:5110
```
```
http://localhost:5111
```
```
http://localhost:5112
```
```
http://localhost:5113
```
```
http://localhost:5114
```
```
http://localhost:5115
```
```
http://localhost:5116
```
```
http://localhost:5117
```
```
http://localhost:5118
```
```
http://localhost:5119
```
```
http://localhost:5120
```
```
http://localhost:5121
```
```
http://localhost:5122
```
```
http://localhost:5123
```
```
http://localhost:5124
```
```
http://localhost:5125
```

Express examples:

```
http://localhost:3005
```
```
http://localhost:3006
```
```
http://localhost:3007
```

Handy sub routes while demoing the routing folder:

```
http://localhost:3005/users/42
```
```
http://localhost:3005/search?name=menna&age=24
```
```
http://localhost:3006/products/7
```

The two APIs sitting behind the last two React apps:

```
http://localhost:3024/users
```
```
http://localhost:4000/api/products
```
```
http://localhost:4000/api/products?inStock=true
```

## Ports

Every React example has its own fixed port so several can run side by side
without fighting. Folder 25 uses 4000 for its backend specifically so it can run
at the same time as folder 24.

| Port | What |
|---|---|
| 3005, 3006, 3007 | Express examples 05, 06, 07 |
| 3024 | mock API behind example 24 |
| 4000 | backend of example 25 |
| 5110 to 5124 | React examples 10 to 24, matching the folder number |
| 5125 | frontend of example 25 |

Folders 01, 02, 03, 04, 08 and 09 have no port. They are terminal scripts:

```bash
node 01-js-variables-objects/index.js
```
```bash
node 02-js-functions/index.js
```
```bash
node 03-js-async/04-async-offline.js
```
```powershell
04-git-essentials\demo.ps1
```
```bash
mongosh --file 08-mongodb-mongosh/seed.mongosh.js
```
```bash
node 09-mongoose-crud/index.js
```

## Suggested order for a live session

1. **01 to 03** while everyone's laptop is still catching up. Pure JavaScript, no setup.
2. **04** git, same reason.
3. **05 to 07** the backend story: routes, then routers, then MVC.
4. **08 and 09** the database, if Mongo cooperates. Skippable without losing the thread.
5. **10 to 16** React on its own: JSX, props, then hooks.
6. **17 to 23** routing, in order. Each builds on the one before.
7. **24 and 25** putting it together. Example 25 is the shape of the assignment.

If you only get one session, the spine is **07, 13, 15, 17, 25**.

## Notes

Every example here was run before it was committed, and the React ones all build
clean with `npm run build`.

The in memory models reset on every restart. That is deliberate. It is the
fastest way to show why a real database is needed.

The backend examples print their routes on startup, so you never have to guess a
URL mid demo.

Example 25's models can be swapped for the Mongoose ones from example 09 without
touching anything else in the app. That swap is the best argument for MVC you can
show a room.

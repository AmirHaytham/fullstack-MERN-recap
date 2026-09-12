# 09. Mongoose

From the "connecting a database" slide (page 014).

| File | What it shows |
|---|---|
| `index.js` | the slide's code: connect, schema, model, insert, find, update, delete |
| `validation.js` | the "adds validation and structure" claim, tested against bad data |

## Before you start

```bash
mongosh --eval "db.runCommand({ping:1})"
```

## Run it

```bash
npm install
```

```bash
npm start
```

```bash
npm run validation
```

Against Atlas instead of a local server:

```powershell
$env:MONGO_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/mydb"; npm start
```

Both scripts wipe their own collection first, so you can rerun them as often as
you like during a session.

## Worth showing

The slide uses `.then()`. This version uses async/await so the output prints in
order. Show both and connect it back to example 03.

Drop `{ new: true }` from `findOneAndUpdate` and watch the old document come
back. Everyone hits this once.

Run the validation script and walk down the failures. Then point at what got
stored: the email was lowercased and trimmed, and the `hacked: true` field was
dropped because it is not in the schema. That is the structure Mongoose adds on
top of schemaless MongoDB.

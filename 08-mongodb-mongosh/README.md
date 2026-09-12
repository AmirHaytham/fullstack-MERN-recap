# 08. MongoDB and mongosh

From the MongoDB and MongoSh slides (pages 012 and 013).

The hierarchy of databases, collections, documents and fields, plus full CRUD
from the shell with projections, `$gt`, `sort` and `limit`.

This is the only example that needs anything beyond Node.

## Before you start

Either a local MongoDB or a free Atlas cluster. Check it:

```bash
mongosh --eval "db.runCommand({ping:1})"
```

If that prints `{ ok: 1 }` you are set. If the command is missing, install the
MongoDB Shell too.

## Run it

The whole seeded demo in one go:

```bash
mongosh "mongodb://localhost:27017" --file seed.mongosh.js
```

Better in a lecture, open the shell and type from `commands.md` block by block:

```bash
mongosh
```

For Atlas, swap the connection string:

```bash
mongosh "mongodb+srv://<user>:<password>@<cluster>.mongodb.net" --file seed.mongosh.js
```

## Worth showing

Moamen gets inserted with no `courses` field. Then query `courses: "SP1"` and he
simply does not appear. No migration, no error. Say plainly that this is both the
strength and the danger of NoSQL.

Open Compass right after seeding and show the same `sp1_demo.students` collection
in the GUI. Shell and GUI agreeing is what makes it click.

`commands.md` ends with a SQL translation table for anyone who took databases.

## One gotcha

`seed.mongosh.js` is a mongosh script, not a Node script. `node seed.mongosh.js`
will fail because `db` only exists inside mongosh.

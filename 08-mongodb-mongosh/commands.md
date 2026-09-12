# mongosh commands to type live in front of the class

Start the shell first:

```bash
mongosh
```

Then paste these one block at a time.

## Navigating: MongoDB > DataBases > Collections > Documents > Field

```js
show dbs
use sp1_demo
show collections
```

`use` creates the database lazily. It does not exist on disk until you insert
the first document, which is a good thing to point out.

## Create

```js
db.students.insertOne({ name: "Amir", age: 24, email: "amir@example.com" })
```

```js
db.students.insertMany([
  { name: "Menna", age: 24, courses: ["SP1", "DB"] },
  { name: "Hassan", age: 22, courses: ["SP1"] },
  { name: "Moamen", age: 25 }
])
```

Note that `Moamen` has no `courses` field. MongoDB does not care. That is what
"optional schemas" means on the slide.

## Read

```js
db.students.find()
```

```js
db.students.find({ age: 24 })
```

```js
db.students.find({ age: 24 }, { _id: 0, name: 1, age: 1 })
```

```js
db.students.find({ age: { $gt: 23 } })
```

```js
db.students.find({ courses: "SP1" })
```

```js
db.students.find().sort({ age: -1 }).limit(2)
```

The exact query from the slide, against the sample movies dataset:

```js
db.movies.find({ year: 1982 }, { _id: 0, year: 1, title: 1 }).limit(5)
```

## Update

```js
db.students.updateOne({ name: "Hassan" }, { $set: { age: 23 } })
```

```js
db.students.updateMany({}, { $set: { faculty: "Informatics" } })
```

## Delete

```js
db.students.deleteOne({ name: "Amir" })
```

```js
db.students.drop()
```

## Mapping to SQL, for students who took a databases course

| SQL | MongoDB |
|---|---|
| table | collection |
| row | document |
| column | field |
| `SELECT * FROM students` | `db.students.find()` |
| `SELECT name FROM students WHERE age = 24` | `db.students.find({age:24},{name:1})` |
| `INSERT INTO students ...` | `db.students.insertOne({...})` |
| `UPDATE students SET age=23 WHERE ...` | `db.students.updateOne({...},{$set:{age:23}})` |
| `DELETE FROM students WHERE ...` | `db.students.deleteOne({...})` |

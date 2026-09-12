// Run with:   mongosh "mongodb://localhost:27017" --file seed.mongosh.js
// This is a mongosh script, NOT a Node script. Do not run it with `node`.

// MongoDB > DataBases > Collections > Documents > Field
db = db.getSiblingDB('sp1_demo');

print('--- dropping the old demo collection ---');
db.students.drop();

print('--- insertOne: one document (like one row in SQL) ---');
db.students.insertOne({ name: 'Amir', age: 24, email: 'amir@example.com' });

print('--- insertMany: several documents ---');
db.students.insertMany([
  { name: 'Menna',  age: 24, email: 'menna@giu-uni.de',  courses: ['SP1', 'DB'] },
  { name: 'Hassan', age: 22, email: 'hassan@giu-uni.de', courses: ['SP1'] },
  { name: 'Rahma',  age: 23, email: 'rahma@giu-uni.de',  courses: ['SP1', 'AI'] },
  { name: 'Moamen', age: 25, email: 'moamen@giu-uni.de' }        // no `courses` field: schemas are optional
]);

print('--- find(): read everything ---');
printjson(db.students.find().toArray());

print('--- find with a filter ---');
printjson(db.students.find({ age: 24 }).toArray());

print('--- projection: only the fields I ask for (like the slide) ---');
printjson(db.students.find({ age: 24 }, { _id: 0, name: 1, age: 1 }).toArray());

print('--- operators: age greater than 23 ---');
printjson(db.students.find({ age: { $gt: 23 } }, { _id: 0, name: 1, age: 1 }).toArray());

print('--- array field: who takes SP1 ---');
printjson(db.students.find({ courses: 'SP1' }, { _id: 0, name: 1 }).toArray());

print('--- updateOne ---');
db.students.updateOne({ name: 'Hassan' }, { $set: { age: 23 } });
printjson(db.students.findOne({ name: 'Hassan' }));

print('--- deleteOne ---');
db.students.deleteOne({ name: 'Amir' });

print('--- sort + limit ---');
printjson(db.students.find({}, { _id: 0, name: 1, age: 1 }).sort({ age: -1 }).limit(2).toArray());

print('--- countDocuments ---');
print('total students: ' + db.students.countDocuments());

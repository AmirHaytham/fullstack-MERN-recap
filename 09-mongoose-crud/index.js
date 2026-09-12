// Mongoose: defines schemas and models, adds validation, gives clean CRUD APIs.
//
// This is the slide's code, run top to bottom with async/await so the output
// appears in a readable order instead of racing.

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';

// Define schema (exactly as on the slide)
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  email: String,
});

// Create model
const Student = mongoose.model('Student', studentSchema);

async function main() {
  // Connect to DB
  await mongoose.connect(MONGO_URI);
  console.log('connected to', MONGO_URI);

  // start from a clean slate so the demo is repeatable
  await Student.deleteMany({});

  // Insert new student
  const newStudent = new Student({ name: 'Hana', age: 23, email: 'hana@guc.edu' });
  await newStudent.save();
  console.log('\nStudent saved!');

  await Student.insertMany([
    { name: 'Menna', age: 24, email: 'menna@giu-uni.de' },
    { name: 'Hassan', age: 22, email: 'hassan@giu-uni.de' },
  ]);

  // Read all students
  const all = await Student.find();
  console.log('\nfind() ->');
  console.log(all);

  // Read with a filter + projection + sort
  const older = await Student.find({ age: { $gte: 23 } }, 'name age').sort({ age: -1 });
  console.log('\nfind({ age: { $gte: 23 } }) ->');
  console.log(older);

  // Update student
  const updated = await Student.findOneAndUpdate(
    { name: 'Hana' },
    { age: 24 },
    { new: true }            // { new: true } returns the document AFTER the update
  );
  console.log('\nfindOneAndUpdate ->');
  console.log(updated);

  // Delete student
  const result = await Student.deleteOne({ name: 'Hana' });
  console.log('\ndeleteOne ->');
  console.log(result);

  console.log('\nremaining:', await Student.countDocuments());

  await mongoose.disconnect();
  console.log('disconnected');
}

main().catch((err) => {
  console.error('\nSomething went wrong:', err.message);
  console.error('Is mongod running? Try:  mongosh --eval "db.runCommand({ping:1})"');
  process.exit(1);
});

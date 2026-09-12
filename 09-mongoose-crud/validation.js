// "Adds validation and structure to your NoSQL data."
// Raw MongoDB would happily store garbage. Mongoose refuses.

const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';

const studentSchema = new mongoose.Schema({
  name:  { type: String, required: true, minlength: 3 },
  age:   { type: Number, min: 16, max: 99 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const Student = mongoose.model('StudentValidated', studentSchema);

async function tryToSave(label, data) {
  try {
    const doc = await Student.create(data);
    console.log(`[OK]     ${label} ->`, doc.toObject());
  } catch (err) {
    console.log(`[FAILED] ${label} -> ${err.message.split('\n')[0]}`);
  }
}

async function main() {
  await mongoose.connect(MONGO_URI);
  await Student.deleteMany({});
  await Student.syncIndexes();          // makes `unique` actually enforced

  await tryToSave('valid student',        { name: 'Menna', age: 24, email: 'Menna@GIU-uni.de  ' });
  await tryToSave('missing name',         { age: 24, email: 'x@giu-uni.de' });
  await tryToSave('name too short',       { name: 'Al', age: 24, email: 'y@giu-uni.de' });
  await tryToSave('age below minimum',    { name: 'Karim', age: 9, email: 'z@giu-uni.de' });
  await tryToSave('duplicate email',      { name: 'Other', age: 30, email: 'menna@giu-uni.de' });
  await tryToSave('extra unknown field',  { name: 'Rahma', age: 23, email: 'r@giu-uni.de', hacked: true });

  console.log('\nStored documents:');
  console.log(await Student.find().lean());
  console.log('\nNotice: the email was lowercased and trimmed, and `hacked` was dropped,');
  console.log('because it is not in the schema.');

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('Something went wrong:', err.message);
  process.exit(1);
});

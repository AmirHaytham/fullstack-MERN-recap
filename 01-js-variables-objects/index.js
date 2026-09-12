// Variables & Constants  +  Objects

console.log('===== 1) var / let / const =====');

// var -> function-scoped, can be redeclared. Mostly avoided now.
var city = 'Cairo';
var city = 'Berlin';            // redeclaring is allowed
console.log('var city  ->', city);

// let -> block-scoped (limited to { }), safer for values that change
let counter = 0;
{
  let counter = 99;             // a DIFFERENT variable, lives only in this block
  console.log('let inside block ->', counter);
}
counter = counter + 1;          // reassigning is allowed
console.log('let outside block ->', counter);

// const -> block-scoped, the reference cannot be reassigned
const PI = 3.14;
console.log('const PI ->', PI);
try {
  eval('PI = 3');               // eval so the file still parses
} catch (err) {
  console.log('reassigning a const throws ->', err.message);
}

// IMPORTANT: const freezes the REFERENCE, not the content
const scores = [1, 2, 3];
scores.push(4);                 // allowed
console.log('const array can still be mutated ->', scores);

console.log('\n===== 2) Objects =====');

// Define an object (exact example from the slide)
let person = { name: 'Menna', age: 24 };
console.log('person ->', person);

// Three ways to access object properties
// a) Dot notation
console.log('dot notation      -> person.name    =', person.name);

// b) Square brackets notation
console.log('bracket notation  -> person["name"] =', person['name']);

// bracket notation is the only one that works with a dynamic key
const key = 'age';
console.log('dynamic key       -> person[key]    =', person[key]);

// c) Object destructuring
const { name, age } = person;
console.log('destructuring     -> name =', name, '| age =', age);

// destructuring with rename + default value
const { name: fullName, country = 'Egypt' } = person;
console.log('rename + default  -> fullName =', fullName, '| country =', country);

console.log('\n===== 3) Nested objects & spread =====');
const student = {
  name: 'Hana',
  contact: { email: 'hana@giu-uni.de', phone: '0100' },
};
const { contact: { email } } = student;
console.log('nested destructuring -> email =', email);

const updated = { ...student, name: 'Hana Ali' };   // copy + override
console.log('spread copy ->', updated);
console.log('original is untouched ->', student.name);

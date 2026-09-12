console.log('===== 1) Named function =====');
function greet() {
  return 'Hello!';
}
console.log(greet());

console.log('\n===== 2) Anonymous function (stored in a variable) =====');
const greetAnon = function () {
  return 'Hi from anonymous!';
};
console.log(greetAnon());

console.log('\n===== 3) Arrow function (shorter syntax) =====');
const greetArrow = () => 'Hello from arrow function!';
console.log(greetArrow());

// arrow function with parameters and a body
const add = (a, b) => {
  const result = a + b;
  return result;
};
console.log('add(2, 3) ->', add(2, 3));

console.log('\n===== 4) High order array functions =====');
const students = [
  { name: 'Menna', grade: 88 },
  { name: 'Hassan', grade: 62 },
  { name: 'Rahma', grade: 95 },
  { name: 'Moamen', grade: 71 },
];

// forEach -> run something for every element, returns nothing
console.log('-- forEach --');
students.forEach((s) => console.log(`  ${s.name}: ${s.grade}`));

// map -> build a NEW array of the same length
const names = students.map((s) => s.name);
console.log('-- map --      ', names);

// filter -> build a NEW array with only what passes the test
const passed = students.filter((s) => s.grade >= 70);
console.log('-- filter --   ', passed.map((s) => s.name));

// find -> the FIRST element that passes the test (or undefined)
const top = students.find((s) => s.grade > 90);
console.log('-- find --     ', top);

// reduce -> squeeze the whole array into ONE value
const total = students.reduce((sum, s) => sum + s.grade, 0);
console.log('-- reduce --   ', 'average =', (total / students.length).toFixed(2));

// sort -> careful: sort mutates the array, so copy first with [...]
const ranked = [...students].sort((a, b) => b.grade - a.grade);
console.log('-- sort --     ', ranked.map((s) => `${s.name}(${s.grade})`).join(' > '));

// they chain, which is why React code looks like this
const shortlist = students
  .filter((s) => s.grade >= 70)
  .map((s) => s.name.toUpperCase());
console.log('-- chained --  ', shortlist);

console.log('\n===== 5) Why arrow functions matter (this) =====');
const counterObject = {
  count: 10,
  regular: function () {
    return this.count;          // `this` = counterObject
  },
  arrow: () => {
    return this?.count;         // `this` is NOT counterObject
  },
};
console.log('regular function this.count ->', counterObject.regular());
console.log('arrow function   this.count ->', counterObject.arrow());

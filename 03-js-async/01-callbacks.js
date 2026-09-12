// Callbacks -> pass a function to be executed later

console.log('1. start');

// setTimeout takes a CALLBACK and runs it later
setTimeout(() => {
  console.log('3. this callback ran 1 second later');
}, 1000);

console.log('2. end  <-- notice this prints BEFORE the callback');

// A fake "fetch from database" that uses a callback
function getUser(id, callback) {
  setTimeout(() => {
    callback(null, { id, name: 'Menna' });
  }, 500);
}

function getOrders(userId, callback) {
  setTimeout(() => {
    callback(null, ['order-1', 'order-2']);
  }, 500);
}

// The problem with callbacks: they nest. This is "callback hell".
getUser(1, (err, user) => {
  if (err) return console.error(err);
  console.log('4. got user  ->', user.name);

  getOrders(user.id, (err2, orders) => {
    if (err2) return console.error(err2);
    console.log('5. got orders ->', orders);
    console.log('   ...now imagine 5 more levels of this. That is why Promises exist.');
  });
});

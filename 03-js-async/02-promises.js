// Promises -> a cleaner way to handle async operations

// The same fake functions, but returning a Promise instead of taking a callback
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!id) return reject(new Error('no id given'));
      resolve({ id, name: 'Menna' });
    }, 500);
  });
}

function getOrders(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(['order-1', 'order-2']), 500);
  });
}

console.log('1. start');

// .then() chains instead of nesting -> flat, readable
getUser(1)
  .then((user) => {
    console.log('2. got user ->', user.name);
    return getOrders(user.id);      // returning a promise keeps the chain flat
  })
  .then((orders) => {
    console.log('3. got orders ->', orders);
  })
  .catch((err) => {
    console.error('something failed ->', err.message);
  })
  .finally(() => {
    console.log('4. finally always runs');
  });

// A promise that rejects, to show .catch working
getUser(null)
  .then((u) => console.log('never reached', u))
  .catch((err) => console.log('caught the rejection ->', err.message));

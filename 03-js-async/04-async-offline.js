// Same async/await lesson, but with NO internet needed.
// Use this one if the classroom wifi is blocked.

function fakeApiCall(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function fetchData() {
  try {
    console.log('fetching...');
    const data = await fakeApiCall({ id: 1, title: 'Hello from a fake API' }, 800);
    console.log('got ->', data);

    // await pauses the function, but NOT the whole program
    const a = await fakeApiCall('A', 300);
    const b = await fakeApiCall('B', 300);
    console.log('sequential (600ms total) ->', a, b);

    // Promise.all runs them at the same time
    const [c, d] = await Promise.all([
      fakeApiCall('C', 300),
      fakeApiCall('D', 300),
    ]);
    console.log('parallel   (300ms total) ->', c, d);
  } catch (err) {
    console.error('Error:', err);
  }
}

fetchData();
console.log('<-- this line runs FIRST, because fetchData() did not block');

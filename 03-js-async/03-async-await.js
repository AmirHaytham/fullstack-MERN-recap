// async / await -> modern syntax that makes async code look synchronous
// This is the EXACT example from the slide.

async function fetchData() {
  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let data = await response.json();
    console.log(data.slice(0, 3));      // prints the first 3 posts, not all 100
    console.log(`(the API returned ${data.length} posts in total)`);
  } catch (err) {
    console.error('Error:', err.message);
    console.error('--> this example needs internet access.');
  }
}

fetchData();

// The same thing written with .then() so they can compare side by side
console.log('\n--- the same request written with .then() ---');
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => response.json())
  .then((post) => console.log('post 1 title ->', post.title))
  .catch((err) => console.error('Error:', err.message));

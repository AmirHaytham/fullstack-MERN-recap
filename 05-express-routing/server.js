// How application endpoints (URI) respond to client requests.
// A route = 1) an HTTP verb  2) a URL path  3) a handler function

const express = require('express');
const app = express();

app.use(express.json());          // lets us read JSON bodies from req.body

// the 4 routes exactly as they appear on the slide
// GET
app.get('/users', (req, res) => res.send('Get all users'));

// POST
app.post('/users', (req, res) => res.send('Create user'));

// PUT
app.put('/users/:id', (req, res) => res.send(`Update user ${req.params.id}`));

// DELETE
app.delete('/users/:id', (req, res) => res.send(`Delete user ${req.params.id}`));

// the same idea, but showing where the data actually comes from
// req.params  -> the :id part of the path
app.get('/users/:id', (req, res) => {
  res.json({ source: 'req.params', id: req.params.id });
});

// req.query   -> the ?key=value part.  Try /search?name=menna&age=24
app.get('/search', (req, res) => {
  res.json({ source: 'req.query', query: req.query });
});

// req.body    -> the JSON the client sent.  Needs express.json() above.
app.post('/echo', (req, res) => {
  res.json({ source: 'req.body', body: req.body });
});

// a tiny home page so the browser shows something useful
app.get('/', (req, res) => {
  res.send(`
    <h2>Express routing demo</h2>
    <ul>
      <li>GET    <a href="/users">/users</a></li>
      <li>GET    <a href="/users/42">/users/42</a>        (req.params)</li>
      <li>GET    <a href="/search?name=menna&age=24">/search?name=menna&age=24</a> (req.query)</li>
      <li>POST   /users, /echo &nbsp;&nbsp; (use the curl commands in README.md)</li>
      <li>PUT    /users/42</li>
      <li>DELETE /users/42</li>
    </ul>`);
});

// 404 for anything else -> shows that order matters, this must be LAST
app.use((req, res) => res.status(404).send('No route matched this URL'));

const PORT = 3005;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

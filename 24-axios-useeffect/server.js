// A tiny API so this example runs with no internet and no database.
// Run it in its OWN terminal:   npm run api
// It is the "http://localhost:3000/users/" the slide's axios call points at.

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());            // without this the browser blocks the request
app.use(express.json());

const users = [
  { id: 1, name: 'Menna',  email: 'menna@giu-uni.de',  role: 'TA' },
  { id: 2, name: 'Hassan', email: 'hassan@giu-uni.de', role: 'TA' },
  { id: 3, name: 'Rahma',  email: 'rahma@giu-uni.de',  role: 'TA' },
];

// artificial delay so the loading state is actually visible in class
const slow = (ms) => new Promise((r) => setTimeout(r, ms));

app.get('/users', async (req, res) => {
  await slow(600);
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  await slow(600);
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.listen(3024, () => console.log('Mock API running on http://localhost:3024'));

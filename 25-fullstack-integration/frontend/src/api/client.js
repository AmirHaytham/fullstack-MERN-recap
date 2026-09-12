// One axios instance for the whole app.
// Every request inherits the baseURL, so the backend address is written once.

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
});

export default api;

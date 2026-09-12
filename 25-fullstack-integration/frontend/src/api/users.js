// The API layer: components never call axios directly.
// If the backend changes, only this folder changes.

import api from './client';

export const fetchUsers = () => api.get('/users').then((res) => res.data);
export const createUser = (data) => api.post('/users', data).then((res) => res.data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

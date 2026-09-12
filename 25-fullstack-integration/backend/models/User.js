// Users, stored in memory.
// In-memory so this runs with no database. Swap this file for a Mongoose model
// (see example 09) and nothing else in the app has to change. That is the point
// of MVC.

let users = [
  { id: 1, name: 'Menna', email: 'menna@giu-uni.de' },
  { id: 2, name: 'Hassan', email: 'hassan@giu-uni.de' },
];
let nextId = 3;

module.exports = {
  findAll: () => users,
  findById: (id) => users.find((u) => u.id === Number(id)),
  create: (data) => {
    const user = { id: nextId++, ...data };
    users.push(user);
    return user;
  },
  remove: (id) => {
    const before = users.length;
    users = users.filter((u) => u.id !== Number(id));
    return users.length < before;
  },
};

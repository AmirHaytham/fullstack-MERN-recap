// MODEL
// "contains only the pure application data, no logic describing how to
//  present the data to a user. It's just data that is shipped across the app."
//
// In-memory on purpose, so this example runs with NO database installed.
// Example 09 shows the same idea with a real Mongoose model.

let users = [
  { id: 1, name: 'Menna', age: 24 },
  { id: 2, name: 'Hassan', age: 22 },
];
let nextId = 3;

module.exports = {
  findAll: () => users,
  findById: (id) => users.find((u) => u.id === Number(id)),
  create: ({ name, age }) => {
    const user = { id: nextId++, name, age };
    users.push(user);
    return user;
  },
  update: (id, data) => {
    const user = users.find((u) => u.id === Number(id));
    if (!user) return null;
    Object.assign(user, data);
    return user;
  },
  remove: (id) => {
    const before = users.length;
    users = users.filter((u) => u.id !== Number(id));
    return users.length < before;
  },
};

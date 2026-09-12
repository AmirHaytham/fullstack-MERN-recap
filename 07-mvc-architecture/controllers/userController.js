// CONTROLLER
// "exists between the view and the model. Where the actual business logic is
//  written. Listens to events triggered by the view and executes the
//  appropriate reaction, which usually means calling a method on the model."

const User = require('../models/User');

exports.getUsers = (req, res) => {
  res.json(User.findAll());
};

exports.getUser = (req, res) => {
  const user = User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

exports.createUser = (req, res) => {
  // business logic / validation lives HERE, not in the model, not in the route
  const { name, age } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  if (age !== undefined && Number(age) < 0) {
    return res.status(400).json({ error: 'age cannot be negative' });
  }
  const user = User.create({ name, age: Number(age) || null });
  res.status(201).json(user);
};

exports.updateUser = (req, res) => {
  const user = User.update(req.params.id, req.body);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

exports.deleteUser = (req, res) => {
  const ok = User.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: 'User not found' });
  res.status(204).send();
};

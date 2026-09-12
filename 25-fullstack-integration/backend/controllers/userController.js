// The users controller. Business logic lives here.
const User = require('../models/User');

exports.getUsers = (req, res) => res.json(User.findAll());

exports.getUser = (req, res) => {
  const user = User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  res.status(201).json(User.create({ name, email }));
};

exports.deleteUser = (req, res) => {
  if (!User.remove(req.params.id)) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(204).send();
};

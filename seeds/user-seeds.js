const { User } = require('../models/User');

const userData = [
  {
    username: 'alice',
    password: 'password123'
  },
  {
    username: 'bob',
    password: 'password123'
  },
  {
    username: 'charlie',
    password: 'password123'
  }
];

const seedUsers = () => User.bulkCreate(userData, {
  individualHooks: true, // This ensures that any model hooks are respected (e.g., password hashing)
  returning: true,
});

module.exports = seedUsers;

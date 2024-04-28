//const { User } = require('../models/User');
// Correcting the import in the seeding script, e.g., user-seeds.js
const { User } = require('../models');

const bcrypt = require('bcrypt');

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

// Optionally hash passwords before seeding if not using hooks
async function hashPasswords(users) {
  const saltRounds = 10;
  for (let user of users) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  return users;
}

const seedUsers = async () => {
  try {
    const hashedUsers = await hashPasswords(userData); // Remove this line if using hooks to hash passwords
    const seededUsers = await User.bulkCreate(hashedUsers, {
      individualHooks: true, // Use if you have hooks set up for additional operations
      returning: true,
    });
    console.log('Users seeded successfully:', seededUsers);
  } catch (error) {
    console.error('Failed to seed users:', error);
  }
};

module.exports = seedUsers;

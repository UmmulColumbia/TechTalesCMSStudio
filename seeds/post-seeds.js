const { Post } = require('../models');

const postData = [
  {
    title: 'Why MVC is Essential for Developers',
    content: 'Here is why every developer should understand MVC...',
    user_id: 1 // Assuming 'alice' has ID 1
  },
  {
    title: 'Understanding Sequelize',
    content: 'Sequelize simplifies Node.js interaction with SQL databases...',
    user_id: 2 // Assuming 'bob' has ID 2
  },
  {
    title: 'Latest Trends in Web Development',
    content: '2023 will be the year of full-stack development...',
    user_id: 3 // Assuming 'charlie' has ID 3
  }
];

const seedPosts = () => Post.bulkCreate(postData, {
  returning: true,
});

module.exports = seedPosts;

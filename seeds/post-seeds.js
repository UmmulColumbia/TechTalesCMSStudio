const { Post } = require('../models/Post'); // Corrected to import using destructuring if you are exporting models in a bundled manner

const postData = [
  {
    title: 'Why MVC is Essential for Developers',
    content: 'Here is why every developer should understand MVC...',
    userId: 1 // Assuming 'alice' has ID 1, also changed to `userId` if using Sequelize conventions
  },
  {
    title: 'Understanding Sequelize',
    content: 'Sequelize simplifies Node.js interaction with SQL databases...',
    userId: 2 // Assuming 'bob' has ID 2, also changed to `userId`
  },
  {
    title: 'Latest Trends in Web Development',
    content: '2023 will be the year of full-stack development...',
    userId: 3 // Assuming 'charlie' has ID 3, also changed to `userId`
  }
];

const seedPosts = async () => {
  try {
    const seededPosts = await Post.bulkCreate(postData, {
      returning: true,
    });
    console.log('Posts seeded successfully:', seededPosts);
  } catch (error) {
    console.error('Failed to seed posts:', error);
  }
};

module.exports = seedPosts;

const { Comment } = require('../models');

const commentData = [
    {
        text: "Really interesting read, thanks for posting!",
        userId: 1,  // Ensure this user exists in user-seeds
        postId: 1   // Ensure this post exists in post-seeds
    },
    {
        text: "I had never thought about it that way before.",
        userId: 2,  // Ensure this user exists
        postId: 1
    },
    {
        text: "Great article, but I think you missed a key point about...",
        userId: 1,
        postId: 2   // Ensure this post exists
    },
    // More comments as needed...
];

const seedComments = async () => {
    await Comment.bulkCreate(commentData, { validate: true });
};

module.exports = seedComments;

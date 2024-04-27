const router = require('express').Router();
const User = require('../models/Post');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Other post routes...
module.exports = router;

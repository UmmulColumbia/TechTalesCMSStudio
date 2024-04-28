const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');

// Middleware to check if the user is logged in
function isAuthenticated(req, res, next) {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
}

// GET Dashboard page
router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        // Assuming you have a User model and each user has many posts
        const userData = await User.findByPk(req.session.user_id, {
            include: [{ model: Post, include: [Comment] }] // Including posts and their comments
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            user,
            posts: user.posts,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        console.error('Error accessing dashboard:', error);
        res.status(500).send('Error accessing the dashboard');
    }
});

module.exports = router;

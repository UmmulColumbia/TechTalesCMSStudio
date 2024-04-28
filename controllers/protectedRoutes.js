const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models'); 
const withAuth = require('../utils/auth');

// Protected route for the dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { userId: req.session.userId },
            include: [{ model: Comment }]
        });
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Protected route for user profile
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.userId);
        const user = userData.get({ plain: true });
        res.render('profile', {
            user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

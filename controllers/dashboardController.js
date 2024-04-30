const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');

// Middleware to check if the user is logged in
function isAuthenticated(req, res, next) {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
       next();
    }
}
router.get('/', (req, res) => {
    res.render('dashboard');
});

// GET form for creating a new post
router.get('/posts/new', isAuthenticated, (req, res) => {
    res.render('new_post_form'); // Render form to create a new post
});

module.exports = router;



         
